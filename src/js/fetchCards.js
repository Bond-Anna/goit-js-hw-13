import axios from 'axios';
export default class PicsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchCards() {
    const API_KEY = '22720619-487e18f692264a9911b958ddb';
    return axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
      )
      .then(response => response.data)
      .then(({ totalHits, hits }) => {
        this.page += 1;
        console.log({ totalHits, hits });
        return { totalHits, hits };
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
