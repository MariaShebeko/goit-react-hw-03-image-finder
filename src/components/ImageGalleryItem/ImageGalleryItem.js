import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, largeImage, id, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img
        id={id}
        src={src}
        alt={alt}
        srcmodal={largeImage}
        className={s.image}
        onClick={onClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
