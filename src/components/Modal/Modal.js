import { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {
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
