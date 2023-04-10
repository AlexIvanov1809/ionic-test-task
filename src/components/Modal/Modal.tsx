import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Modal.css';
import { useHistory } from 'react-router';
import { heart } from 'ionicons/icons';
import { useBeers, useBeersSetters } from '../../context/BeersContext';

interface Props {
  isOpen: boolean;
  onSetIsOpen: (bool: boolean) => void;
  title: string;
}

const Modal = ({ isOpen, onSetIsOpen, title }: Props) => {
  const history = useHistory();
  const beers = useBeers();
  const beersSetters = useBeersSetters();

  const handleClick = (id: number) => {
    history.push(`/product/${id}`);
    onSetIsOpen(false);
  };

  const handleRemove = (id: number) => {
    beersSetters.removeFavorite(id);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onSetIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {beers.favorites.length ? (
          <ol className="favorite-list">
            {beers.favorites.map((favorite) => (
              <li className="favorite-item" key={favorite.id}>
                <IonButton
                  slot="start"
                  onClick={() => handleClick(favorite.id)}
                >
                  {favorite.name}
                </IonButton>
                <IonButton onClick={() => handleRemove(favorite.id)} slot="end">
                  <IonIcon icon={heart}></IonIcon>
                </IonButton>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty">Is empty</div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default Modal;
