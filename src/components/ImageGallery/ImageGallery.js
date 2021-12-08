import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.imageName !== this.props.imageName) {
      console.log('change images');

      fetch(
        `https://pixabay.com/api/?q=${this.props.imageName}&page=1&key=23951703-436932e17dab2edd529d032c5&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(data => data.hits)
        .then(images => this.setState({ images }));
    }
  }

  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.state.images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              src={image.previewURL}
              alt={image.tags}
            />
          );
        })}
      </ul>
    );
  }
}
