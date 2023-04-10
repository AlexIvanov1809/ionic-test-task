import { createRoot } from 'react-dom/client';
import App from './App';
import BeersProvider from './context/BeersContext';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BeersProvider>
    <App />
  </BeersProvider>,
);
