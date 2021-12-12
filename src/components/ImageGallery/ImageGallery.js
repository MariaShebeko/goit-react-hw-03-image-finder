import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(image => ImageGalleryItem(image, onClick))}
    </ul>
  );
};
export default ImageGallery;
