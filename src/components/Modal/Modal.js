import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ src, alt, onClose }) {
  // window.addEventListener('keydown', e => {
  //   if (e.code === 'Escape') {
  //     this.props.onClose();
  //   }
  // });

  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
