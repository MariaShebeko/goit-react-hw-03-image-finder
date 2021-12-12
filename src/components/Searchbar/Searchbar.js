import React, { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.target.value.toLowerCase() });
  };

  handleNameSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.error('Press the name of the image!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleNameSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.label}>Search</span> <FaSistrix />
          </button>

          <input
            onChange={this.handleNameChange}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
