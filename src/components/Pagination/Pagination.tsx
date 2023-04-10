import { IonButton, IonButtons, IonIcon, IonToolbar } from '@ionic/react';
import './Pagination.css';
import { PAGE_NUMBERS } from '../../constants/consts';
import { caretBack, caretForward } from 'ionicons/icons';

interface ContainerProps {
  page: number;
  onSetPage: (num: number) => void;
}

const Pagination: React.FC<ContainerProps> = ({ page, onSetPage }) => {
  const setColor = (pageNum: number): 'medium' | 'warning' => {
    return page === pageNum ? 'medium' : 'warning';
  };
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton onClick={() => onSetPage(Math.max(1, page - 1))}>
          <IonIcon icon={caretBack}></IonIcon>
        </IonButton>
      </IonButtons>
      <div className="pagination-btn-container">
        {PAGE_NUMBERS.map((pageNum) => {
          if (
            pageNum === 1 ||
            (pageNum >= (page > 7 ? 8 : page) && pageNum < page + 5)
          ) {
            return (
              <IonButton
                color={setColor(pageNum)}
                key={pageNum}
                onClick={() => onSetPage(pageNum)}
              >
                {pageNum}
              </IonButton>
            );
          }
        })}
      </div>
      <IonButtons slot="end">
        <IonButton onClick={() => onSetPage(Math.min(12, page + 1))}>
          <IonIcon icon={caretForward}></IonIcon>
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Pagination;
