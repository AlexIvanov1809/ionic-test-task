import { useEffect, useState } from 'react';
import { IBeer } from '../types/beerType';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  useIonLoading,
} from '@ionic/react';
import { useParams } from 'react-router';
import Header from '../components/Header/Header';
import { heart, heartOutline } from 'ionicons/icons';
import { useBeers, useBeersSetters } from '../context/BeersContext';
import fetchData from '../utils/fetchData';
import ErrorToast from '../components/ErrorToast/ErrorToast';

const BeerPage = () => {
  const { id } = useParams<{ id: string }>();
  const beers = useBeers();
  const beersSetters = useBeersSetters();
  const [product, setProduct] = useState<null | IBeer>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [present, dismiss] = useIonLoading();
  const fetchProps = {
    endpoint: '/' + id,
    dismiss,
    setProduct,
    setError: beersSetters.setError,
  };

  useEffect(() => {
    const beer = beersSetters.findBeer(+id);
    setIsFavorite(!!beersSetters.findFavorite(+id));
    if (beer) {
      setProduct(beer);
    } else {
      present({ message: 'Loading...' });
      fetchData(fetchProps);
      beersSetters.setFavoritesBeers();
    }

    return () => {
      dismiss();
    };
  }, [id]);

  useEffect(() => {
    setIsFavorite(!!beersSetters.findFavorite(+id));
  }, [beers.favorites]);

  const handleClick = () => {
    if (product) {
      if (isFavorite) {
        beersSetters.removeFavorite(+id);
        setIsFavorite(false);
      } else {
        beersSetters.addFavorite({ id: product.id, name: product.name });
        setIsFavorite(true);
      }
    }
  };

  return (
    <IonPage>
      <Header enableBack={true} pageName="Product" />
      <IonContent fullscreen>
        {product && (
          <IonCard>
            <div className="img-container">
              <img height={200} src={product.image_url} alt={product.name} />
            </div>
            <IonCardHeader>
              <IonCardTitle>{product.name}</IonCardTitle>
              <IonCardSubtitle>{product.tagline}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <strong>Since:</strong> {product.first_brewed}
            </IonCardContent>
            <IonCardContent>{product.description}</IonCardContent>
            <IonCardContent>
              <strong>Brewers tip:</strong> {product.brewers_tips}
            </IonCardContent>
            <IonButton onClick={handleClick} expand="block">
              Add to favorites
              <IonIcon
                slot="end"
                icon={isFavorite ? heart : heartOutline}
              ></IonIcon>
            </IonButton>
          </IonCard>
        )}
      </IonContent>
      <ErrorToast />
    </IonPage>
  );
};

export default BeerPage;
