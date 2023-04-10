interface IBeer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  brewers_tips: string;
  contributed_by: string;
}

type FavoriteBeer = Pick<IBeer, 'id' | 'name'>;

interface IRootStore {
  beers: IBeer[];
  favorites: FavoriteBeer[];
  page: number;
  error: { status: boolean; message: string };
}

interface IUpdateRootStore {
  setBeersItems: (beers: IBeer[]) => void;
  setPage: (page: number) => void;
  findBeer: (id: number) => IBeer | undefined;
  setFavoritesBeers: () => void;
  findFavorite: (id: number) => FavoriteBeer | undefined;
  removeFavorite: (id: number) => void;
  addFavorite: (favorite: FavoriteBeer) => void;
  setError: (error: IRootStore['error']) => void;
}

export type { IBeer, FavoriteBeer, IRootStore, IUpdateRootStore };
