export default class galleryService {
 constructor() {
  this.searchQuery = '';
  this.page = 1;
 }

 fetchImages() {
  console.log(this);
  const BASE_URL = 'https://pixabay.com/api/'
const KEY = '30638456-f2e7f2d4200256b3df9ced703'

// Запит на бекенд
const URL = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=20`
  console.log(URL);
  
return fetch(URL)
 .then(response => {
  return response.json()
 }).then((data) => {
    console.log(data.hits);
    return data.hits
     // якщо запит успішний, то page збільшуємо на 1
    this.incrementPage()
   })
   .catch(error => console.log(error));
 };


 incrementPage() {
   this.page += 1;
 }

 resetPage() {
  this.page = 1;
 }

 get query() {
  this.searchQuery;

 }
 set query(newQuery) {
  this.searchQuery = newQuery;
   
 }
}

