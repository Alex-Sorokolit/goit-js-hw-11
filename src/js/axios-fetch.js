import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30638456-f2e7f2d4200256b3df9ced703'

async function fetchImages(query, page, perPage) {
      const response = await axios.get(`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&${perPage}`);
   return response;
}





