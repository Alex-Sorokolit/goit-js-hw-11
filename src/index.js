import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";

// Додати бібліотеку axios

// const instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

import { Notify } from "notiflix";
// Notify.success('Все добре');
// Notify.failure('Все погано');
// Notify.info('Інфо');

//Імпортуємо клас 
import GalleryApiService from './js/gallery-service'

//Робимо екземпляр класу щоб отримати об'єкт із методами
const galleryApiService = new GalleryApiService();

const refs = {
 searchQuery: document.querySelector('[name="searchQuery"]'),
 searchForm: document.querySelector('.search-form'),
 galleryList: document.querySelector('.js-gallery'),
 loadMoreButton:document.querySelector('.load-more'),
}
// console.log(galleryApiService);


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreButton.addEventListener('click', loadMore)

function onSearch(event) {
 event.preventDefault();


 // Забираємо дані з input і присвоюємо в об'єкт 
 galleryApiService.query = event.currentTarget.elements.searchQuery.value;
 console.log(event.currentTarget.elements.searchQuery.value);
 galleryApiService.resetPage();
 // надсилаємо запит
 galleryApiService.fetchImages().then(images => {
  renderImages(images);
  // Запуск бібліотеки
let lightbox = new SimpleLightbox('.gallery a', {
 captionsData: 'alt',
 captionDelay: 250,
  captionPosition: 'bottom',
//  overlay: false,
}).refresh();
 })


 
};





function loadMore() {
  galleryApiService.fetchImages();
}

function createMurkup ({largeImageURL, webformatURL,tags,likes,views,comments,downloads}) {
 // console.log(webformatURL);
 return `<div class="gallery-item">
<a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image"
  src="${webformatURL}" 
  alt="${tags}" loading="lazy" />

   </a>
    <div class="info">
    <p class="info-item info-item__likes"><span class="material-symbols-outlined">
    thumb_up</span><br>${likes}</p>

    <p class="info-item info-item__views"><span class="material-symbols-outlined">
    visibility
    </span><br>${views}</p>

    <p class="info-item info-item__comment"><span class="material-symbols-outlined">
    comment
    </span><br>${comments}</p>

    <p class="info-item info-item__downloads"><span class="material-symbols-outlined">
    download  </span><br>${downloads}</p>
  </div>
</div>`

}

function renderImages(data) {
 const markup = data.map(createMurkup).join('');
 console.log(markup);
 // refs.galleryList.innerHTML = markup;
refs.galleryList.insertAdjacentHTML('beforeend', markup);

}


