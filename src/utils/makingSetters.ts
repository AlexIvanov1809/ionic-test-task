import {
  getFavoritesFromStorage,
  setFavoritesToStorage,
} from '../services/localStorage.service';
import { FavoriteBeer, IBeer, IRootStore } from '../types/beerType';

export default function makingSetters(
  beers: IRootStore,
  setBeers: React.Dispatch<React.SetStateAction<IRootStore>>,
) {
  return {
    setBeersItems(beers: IBeer[]) {
      setBeers((prev) => ({ ...prev, beers }));
    },

    setPage(page: number) {
      setBeers((prev) => ({ ...prev, page }));
    },

    findBeer(id: number): IBeer | undefined {
      return beers.beers.filter((beer) => beer.id === id)[0];
    },

    setFavoritesBeers() {
      setBeers((prev) => ({ ...prev, favorites: getFavoritesFromStorage() }));
    },

    findFavorite(id: number): FavoriteBeer | undefined {
      return beers.favorites.filter((favorite) => favorite.id === id)[0];
    },

    removeFavorite(id: number): void {
      const data = beers.favorites.filter((favorite) => favorite.id !== id);
      setFavoritesToStorage(data);
      setBeers((prev) => ({ ...prev, favorites: data }));
    },

    addFavorite(favorite: FavoriteBeer): void {
      const data = [...beers.favorites, favorite];
      setFavoritesToStorage(data);
      setBeers((prev) => ({ ...prev, favorites: data }));
    },

    setError(error: IRootStore['error']): void {
      setBeers((prev) => ({ ...prev, error }));
    },
  };
}
