import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import { useHistory } from 'react-router';
import Pagination from '../components/Pagination/Pagination';
import Header from '../components/Header/Header';
import { useBeers, useBeersSetters } from '../context/BeersContext';
import ErrorToast from '../components/ErrorToast/ErrorToast';

const Home: React.FC = () => {
  const beers = useBeers();
  const beersSetters = useBeersSetters();
  const history = useHistory();

  return (
    <IonPage>
      <Header pageName="Home" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {beers.beers.map((beer) => (
          <IonCard
            onClick={() => history.push(`product/${beer.id}`)}
            key={beer.id}
          >
            <div className="img-container">
              <img height={200} src={beer.image_url} alt={beer.name} />
            </div>
            <IonCardHeader>
              <IonCardTitle>Alcohol by volume: {beer.abv}</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        ))}
        {beers.beers.length > 0 && (
          <Pagination page={beers.page} onSetPage={beersSetters.setPage} />
        )}
        <ErrorToast />
      </IonContent>
    </IonPage>
  );
};

export default Home;
