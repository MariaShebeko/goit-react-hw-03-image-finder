import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, id }) => {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img src={src} alt={alt} className={s.image} />
    </li>
  );
};

export default ImageGalleryItem;
