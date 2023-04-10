import { API_URL } from '../constants/consts';
import { IBeer, IUpdateRootStore } from '../types/beerType';

interface Props {
  endpoint: string;
  dismiss: () => Promise<void>;
  setBeersItems?: IUpdateRootStore['setBeersItems'];
  setProduct?: (data: IBeer) => void;
  setError: IUpdateRootStore['setError'];
}

const fetchData = async ({
  endpoint,
  dismiss,
  setBeersItems,
  setProduct,
  setError,
}: Props) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    if (setBeersItems) {
      setBeersItems(data);
    }
    if (setProduct) {
      setProduct(data[0]);
    }
  } catch (e) {
    setError({ status: true, message: 'Oh, something went wrong...' });
  } finally {
    dismiss();
  }
};

export default fetchData;
