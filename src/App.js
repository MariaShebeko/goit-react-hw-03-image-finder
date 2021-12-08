import './App.css';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
class App extends Component {
  state = {
    images: [],
    loading: false,
    imageName: '',
  };

  handleSearchBarSubmit = imageName => {
    console.log(imageName);
    this.setState({ imageName });
  };
  render() {
    return (
      <>
        <div>
          <Searchbar onSubmit={this.handleSearchBarSubmit} />
          <ImageGallery imageName={this.state.imageName} />
          <ToastContainer />
        </div>
      </>
    );
  }
}

export default App;
