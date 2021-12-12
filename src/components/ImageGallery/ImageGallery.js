import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import ImageErrorView from './GalleryErrorView/GalleryErrorView';
import ImageLoader from '../Loader';
import LoadMoreButton from '../LoadMoreButton';
import Modal from '../Modal';
import s from './ImageGallery.module.css';
const API_KEY = '23951703-436932e17dab2edd529d032c5';
const BASE_URL = 'https://pixabay.com/api/';
export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    loading: false,
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({
        status: 'pending',
        page: 1,
        images: [],
      });
      this.renderGallery();
    }
  }

  renderGallery = () => {
    fetch(
      `${BASE_URL}?q=${this.props.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // 404 не отображается
        return Promise.reject(new Error('No images with this name'));
      })
      .then(data => {
        return data.hits;
      })
      .then(images => {
        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            status: 'resolved',
            page: prevState.page + 1,
            loading: false,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  toIncreasePage = () => {
    this.setState(prevState => {
      if (this.state.images.length > 1) {
        return { page: prevState.page };
      }
    });
  };

  onLoadMore = () => {
    this.setState({ loading: true });
    this.toIncreasePage();
    this.renderGallery();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const imageModal = e.target.getAttribute('src');
    const altModal = e.target.getAttribute('alt');
    this.setState({
      showModal: true,
      modalUrl: imageModal,
      modalAlt: altModal,
    });
  };

  render() {
    const { images, error, status, showModal, modalUrl, modalAlt } = this.state;

    if (status === 'idle') {
      return <div className={s.text}>Press the name of the image</div>;
    }

    if (status === 'pending') {
      return <ImageLoader />;
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  src={image.webformatURL}
                  alt={image.tags}
                  data-src={image.largeImageURL}
                  onClick={this.onImageClick}
                />
              );
            })}
          </ul>
          {showModal && (
            <Modal src={modalUrl} alt={modalAlt} onClose={this.toggleModal} />
          )}
          {this.state.images.length > 0 && !this.state.loading && (
            <LoadMoreButton onClick={this.onLoadMore} />
          )}
        </>
      );
    }
    /* {this.state.images.length !== 0 && (
          <LoadMoreButton onClick={this.incrementPage} />
        )} */
  }
}
