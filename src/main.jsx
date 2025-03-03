import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ReduxProvider from './store/Provider';

createRoot(document.getElementById('root')).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
);
