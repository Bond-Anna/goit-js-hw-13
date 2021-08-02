import './sass/main.scss';
import { Notify } from 'notiflix';
import PicsApiService from './js/fetchCards';
import photoCardTpl from './templates/photo-card.hbs';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let totalRenderedPhotos = 0;

const picsApiService = new PicsApiService();

searchForm.addEventListener('submit', formSubmit);
function formSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('is-hidden');
  clearGallery();
  picsApiService.query = e.currentTarget.elements.searchQuery.value;
  picsApiService.resetPage();
  totalRenderedPhotos = 0;

  picsApiService
    .fetchCards()
    .then(addGalleryMarkup)
    .catch(error => {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    });
}

function addGalleryMarkup({ totalHits, hits }) {
  if (hits.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  totalRenderedPhotos += hits.length;
  if (totalRenderedPhotos === totalHits) {
    Notify.info("We're sorry, but you've reached the end of search results.");

    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  galleryEl.insertAdjacentHTML('beforeend', photoCardTpl(hits));
  loadMoreBtn.classList.remove('is-hidden');
  Notify.success(`Hooray! We found ${totalRenderedPhotos} images out of ${totalHits}.`);
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
function onLoadMoreBtnClick() {
  picsApiService.fetchCards().then(addGalleryMarkup);
}

function clearGallery() {
  galleryEl.innerHTML = '';
}
