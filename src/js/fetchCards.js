import { Notify } from 'notiflix';
export default class PicsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchCards() {
    const API_KEY = '22720619-487e18f692264a9911b958ddb';
    return fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
    )
      .then(response => {
        if (response.totalHits === 0) {
          throw new Error(messade);
        }
        return response.json();
      })
      .then(photos => {
        this.page += 1;
        return photos.hits;
      })
      .catch(error => {
        const message = Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
      });
  }
  get searchQuery() {
    return this.query;
  }
  set searchQuery(newQuery) {
    this.query = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
