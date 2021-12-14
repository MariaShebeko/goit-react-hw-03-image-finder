import './App.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import fetchImages from './services/imageAPI';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageErrorView from './components/ImageGallery/GalleryErrorView/GalleryErrorView';
import ImageLoader from './components/Loader';
import LoadMoreButton from './components/LoadMoreButton';
import Modal from './components/Modal';
import s from './components/ImageGallery/ImageGallery.module.css';

const API_KEY = '23951703-436932e17dab2edd529d032c5';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
    page: 1,
    imageName: '',
    error: null,
    status: 'idle',
    loading: false,
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.imageName !== this.state.imageName) {
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
      `${BASE_URL}?q=${this.state.imageName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('No images with this name'));
      })
      .then(data => {
        return data.hits;
      })
      .then(images => {
        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...images],
            page: prevState.page + 1,
            status: 'resolved',
            loading: false,
            modalUrl: images.largeImageURL,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.setState({ loading: true });
    this.renderGallery();
    const options = {
      top: null,
      behavior: 'smooth',
    };
    options.top = window.pageYOffset + document.documentElement.clientHeight;
    setTimeout(() => {
      window.scrollTo(options);
    }, 1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = e => {
    const { images } = this.state;
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    e.preventDefault();

    const currentImageId = +e.target.id;
    const currentIndex = images.findIndex(image => image.id === currentImageId);
    const imageModal = images[currentIndex].largeImageURL;
    const altModal = e.target.getAttribute('alt');

    this.setState({
      showModal: true,
      modalUrl: imageModal,
      modalAlt: altModal,
    });
  };

  handleSearchBarSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { images, error, status, showModal, modalUrl, modalAlt } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        <ToastContainer />

        {status === 'idle' && (
          <div className={s.text}>Press the name of the image</div>
        )}

        {status === 'pending' && <ImageLoader />}

        {status === 'rejected' && <ImageErrorView message={error.message} />}

        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onClick={this.onImageClick} />

            {showModal && (
              <Modal
                onClose={this.toggleModal}
                modalUrl={modalUrl}
                modalAlt={modalAlt}
              />
            )}
            {this.state.images.length > 11 && !this.state.loading && (
              <LoadMoreButton onClick={this.onLoadMore} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
