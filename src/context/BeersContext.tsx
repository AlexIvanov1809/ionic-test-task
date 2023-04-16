import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IRootStore, IUpdateRootStore } from '../types/beerType';
import { useIonLoading } from '@ionic/react';
import fetchData from '../utils/fetchData';
import makingSetters from '../utils/makingSetters';
import { ROOT_STORE } from '../constants/consts';
import throttle from '../utils/throttle';
import useLatest from '../hooks/useLatest';

interface Props {
  children: ReactNode;
}

const BeersContext = React.createContext<IRootStore>({} as IRootStore);
const BeersUpdateContext = React.createContext<IUpdateRootStore>(
  {} as IUpdateRootStore,
);

export function useBeers() {
  return useContext(BeersContext);
}
export function useBeersSetters() {
  return useContext(BeersUpdateContext);
}

const BeersProvider = ({ children }: Props) => {
  const [beers, setBeers] = useState<IRootStore>(ROOT_STORE);
  const [present, dismiss] = useIonLoading();
  const handleBeersUpdate = makingSetters(beers, setBeers);
  const latestRef = useLatest({
    endpoint: `?page=${beers.page}&per_page=5`,
    dismiss,
    setBeersItems: handleBeersUpdate.setBeersItems,
    setError: handleBeersUpdate.setError,
  });
  const fetching = useCallback(
    throttle(() => {
      fetchData(latestRef.current);
    }, 5000),
    [latestRef],
  );

  useEffect(() => {
    present({ message: 'Loading...' });
    fetching();
    handleBeersUpdate.setFavoritesBeers();
  }, [beers.page]);

  return (
    <BeersContext.Provider value={beers}>
      <BeersUpdateContext.Provider value={handleBeersUpdate}>
        {children}
      </BeersUpdateContext.Provider>
    </BeersContext.Provider>
  );
};

export default BeersProvider;
