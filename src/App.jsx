'use client';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import ReduxProvider from './store/Provider';

function App() {
  return (
    <ReduxProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AppRoutes />
    </ReduxProvider>
  );
}

export default App;
