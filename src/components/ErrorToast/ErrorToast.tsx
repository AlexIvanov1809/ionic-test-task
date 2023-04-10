import { useBeers, useBeersSetters } from '../../context/BeersContext';
import { IonToast } from '@ionic/react';

const ErrorToast = () => {
  const beers = useBeers();
  const beersSetters = useBeersSetters();

  return (
    <IonToast
      isOpen={beers.error.status}
      message={beers.error.message}
      onDidDismiss={() => beersSetters.setError({ status: false, message: '' })}
      duration={5000}
    ></IonToast>
  );
};

export default ErrorToast;
