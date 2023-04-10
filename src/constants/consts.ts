export const FAVORITES_STORAGE = 'favorite';
export const PAGE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const API_URL = 'https://api.punkapi.com/v2/beers';
export const ROOT_STORE = {
  beers: [],
  favorites: [],
  page: 1,
  error: { status: false, message: '' },
};
