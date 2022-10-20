import { fetchImages } from './js/axios-fetch';
// Iмпорт бібліотеки SimpleLightbox
// import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.css";
// import "simplelightbox/dist/simple-lightbox.min.css";
// Імпорт бібліотеки сповіщень
import { Notify } from "notiflix";
import { renderGallery } from './js/render-images';

// infinityScrol  _____________________________

var options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0
}
var callback = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('isIntersecting');
      loadMore()
      infinityScrol.unobserve(entry.target)
      console.log('unobserve');
      // ------------


// ------------
    }
  });
};
  var infinityScrol = new IntersectionObserver(callback, options);

export { infinityScrol };
  
// ______________________

  const refs = {
    searchQuery: document.querySelector('[name="searchQuery"]'),
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.js-gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    footer: document.querySelector('.footer'),
  }

  // Simplelightbox 
  // Запуск бібліотеки
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });


  let query = '';
  let page = 1;
  const perPage = 40;

  refs.searchForm.addEventListener('submit', onSearch)
  refs.loadMoreButton.addEventListener('click', loadMore)



  // _____________________________________________________________
  function onSearch(event) {
    console.log(event);
    // Видаляємо дію по замовчуванні
    event.preventDefault();

    // Встановлюємо початкову порцію даних
    page = 1;

    // Забираємо дані з input і присвоюємо в об'єкт 
    query = event.currentTarget.elements.searchQuery.value;
    console.log(event.currentTarget.elements.searchQuery.value);
  
    // Видаляємо розмітку з сторінки
    refs.galleryList.innerHTML = '';
  
 
    // Якщо користувач нічого не ввів показуємо повідомлення
    if (query === '') {
      Notify.failure('Input your search query.')
      refs.footer.classList.add('is-hidden');
      return;
    };
    //

    // надсилаємо запит -----------------------------------------------
    fetchImages(query, page, perPage)
      .then(data => {
      
        console.log('totalHits', data.data.totalHits);
//  Якщо нічого не знайдено
        if (data.data.totalHits === 0) {
          Notify.failure('Sorry, there are no images matching your search query. Please try again.')
          refs.footer.classList.add('is-hidden');
          return
        } else {

          renderGallery(data);
          const totalfindedImages = data.data.totalHits;
          Notify.success(`Hooray! We found ${totalfindedImages} images.`, {
            timeout: 1500,
            clickToClose: true,
          })
          if (data.data.totalHits < perPage) {
            refs.footer.classList.add('is-hidden');
            console.log('Мало результатів');
          } else {
            console.log('спрацював else');

            // Знімаємо клас на кнопці loadMore (показуємо кнопку)
            // при бескінечному скролі кнопку не показуємо
            // refs.footer.classList.remove('is-hidden');
            
// Коли доходимо до останнього елемента у галереї
  const target = document.querySelector('.gallery-item:last-child')
  console.log('last child target', target);
  infinityScrol.observe(target);



          }
          lightbox.refresh();
        }
      }).catch(error => console.log(error))
      .finally(() => {
        refs.searchForm.reset();
      });
  }

  
  // loadMore --------------------------------------------------
  function loadMore() {
    page += 1;
    console.log(page);
    console.log('load more');
    fetchImages(query, page, perPage)
      .then(data => {
        console.log(data);
        renderGallery(data);
          const target = document.querySelector('.gallery-item:last-child')
  console.log('last child target', target);
  infinityScrol.observe(target);
        // Запуск бібліотеки
        lightbox.refresh();

        const totalPages = Math.ceil(data.data.totalHits / perPage);
        if (page > totalPages) {
          refs.footer.classList.add('is-hidden');
          Notify.failure("We're sorry, but you've reached the end of search results.")
          infinityScrol.unobserve(target);
            console.log('unobserve');
        }


      }).catch(error => console.log(error))
      .finally(() => {
        refs.searchForm.reset();
      });
  }
