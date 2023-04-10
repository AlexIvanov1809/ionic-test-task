import { FAVORITES_STORAGE } from '../constants/consts';
import { FavoriteBeer } from '../types/beerType';

export function getFavoritesFromStorage(): FavoriteBeer[] {
  const storageData = localStorage.getItem(FAVORITES_STORAGE);
  if (!storageData) {
    return [];
  }
  const data = JSON.parse(storageData);
  const favorites = Array.isArray(data) ? [...data] : [data];
  return favorites;
}

export function setFavoritesToStorage(favorites: FavoriteBeer[]): void {
  localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(favorites));
}
