import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSistrix } from 'react-icons/fa';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleNameSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.warning('Press the name of the image!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleNameSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.label}>Search</span> <FaSistrix />
          </button>
          <input
            onChange={this.handleNameChange}
            value={imageName}
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
