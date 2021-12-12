const API_KEY = '23951703-436932e17dab2edd529d032c5';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    // 404 не отображается
    return Promise.reject(new Error('No images with this name'));
  });
}

export default fetchImages;
