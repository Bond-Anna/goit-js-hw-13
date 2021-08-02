import './sass/main.scss';
import PicsApiService from './js/fetchCards';
import LoadMoreBtn from './js/load-more-btn';
import photoCardTpl from './templates/photo-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const picsApiService = new PicsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
});
console.log(loadMoreBtn);
refs.searchForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  clearGallery();
  picsApiService.query = e.currentTarget.elements.searchQuery.value;
  picsApiService.resetPage();
  picsApiService.fetchCards().then(addGalleryMarkup);
}

// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
function onLoadMoreBtnClick() {
  picsApiService.fetchCards().then(addGalleryMarkup);
}

function addGalleryMarkup(photos) {
  refs.galleryEl.insertAdjacentHTML('beforeend', photoCardTpl(photos));
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
}
