import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { heartOutline, heart, arrowBackOutline } from 'ionicons/icons';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import { useBeers } from '../../context/BeersContext';
import { useHistory } from 'react-router';

interface Props {
  pageName: string;
  enableBack?: boolean;
}

const Header = ({ pageName, enableBack }: Props) => {
  const history = useHistory();
  const beers = useBeers();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const icon = beers.favorites.length ? heart : heartOutline;

  return (
    <IonHeader>
      <IonToolbar>
        {enableBack && (
          <IonButtons slot="start">
            <IonButton onClick={() => history.push('/home')}>
              <IonIcon slot="end" icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        )}
        <IonTitle>{pageName}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => setIsOpen(true)}>
            Favorites
            <IonIcon slot="end" icon={icon}></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <Modal isOpen={isOpen} onSetIsOpen={setIsOpen} title="Favorites" />
    </IonHeader>
  );
};

export default Header;
