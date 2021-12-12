import { Component } from 'react';
// import fetchImages from '../../services/imageAPI';
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
        console.log(images);

        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            status: 'resolved',
            loading: false,
            modalUrl: images.largeImageURL,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
    this.toIncreasePage();
  };

  toIncreasePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onLoadMore = () => {
    this.setState({ loading: true });
    this.renderGallery();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = e => {
    const { images } = this.state;
    console.dir(e.target);

    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const currentImageId = +e.target.id;
    const currentIndex = images.findIndex(image => image.id === currentImageId);
    const imageModal = images[currentIndex].largeImageURL;
    // const imageModal = imageModalIndex.largeImageURL;
    const altModal = e.target.getAttribute('alt');
    console.log('modalUrl', imageModal);
    console.log(currentImageId);

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
            {images &&
              images.map(image => {
                return (
                  <ImageGalleryItem
                    key={image.id}
                    id={image.id}
                    src={image.webformatURL}
                    alt={image.tags}
                    srcmodal={image.largeImageURL}
                    onClick={this.onImageClick}
                  />
                );
              })}
          </ul>
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              modalUrl={modalUrl}
              modalAlt={modalAlt}
            />
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
