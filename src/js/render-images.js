export { renderGallery };
const galleryList = document.querySelector('.js-gallery')

import { infinityScrol } from '../index';
function createMurkup({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) {
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

  };


// Рендер розмітки _________________________________________________________
function renderGallery(data){
  // console.log(data.data.hits);
     const markup = data.data.hits.map(createMurkup).join('');
   // console.log(markup);
  galleryList.insertAdjacentHTML('beforeend', markup);

}
