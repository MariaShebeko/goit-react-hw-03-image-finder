import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeImage, id, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} key={id} onClick={onClick}>
      <img src={src} alt={alt} data-src={largeImage} className={s.image} />
    </li>
  );
};

export default ImageGalleryItem;
