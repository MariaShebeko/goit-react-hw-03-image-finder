import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = (
  { webformatURL, tags, largeImageURL, id },
  onClick,
) => {
  // console.log(src, alt, largeImage, id);

  return (
    <li className={s.ImageGalleryItem} key={`id_${id}`}>
      <img
        onClick={onClick}
        id={id}
        src={webformatURL}
        alt={tags}
        srcmodal={largeImageURL}
        className={s.image}
      />
    </li>
  );
};

export default ImageGalleryItem;
