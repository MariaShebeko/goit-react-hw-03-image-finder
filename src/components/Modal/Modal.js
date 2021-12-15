import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    modalUrl: PropTypes.string.isRequired,
    modalAlt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalUrl, modalAlt } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.onBackdropClick}>
        <div className={s.modal}>
          <img src={modalUrl} alt={modalAlt}></img>
        </div>
      </div>,
      modalRoot,
    );
  }
}
