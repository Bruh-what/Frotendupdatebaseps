'use client';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

import useProfileCheck from './hooks/useProfileCheck';
import { useSelector } from 'react-redux';

function App() {
  useProfileCheck(); // Run profile check on app load

  const isProfileIncomplete = useSelector(
    (state) => state.auth.isProfileIncomplete
  );

  return (
    <>
      {isProfileIncomplete && (
        <div
          style={{
            backgroundColor: '#FB6944',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            fontWeight: 'bold',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
          }}
        >
          Please complete your profile!
        </div>
      )}

      {/* Add padding to avoid content overlap */}
      <div style={{ paddingTop: isProfileIncomplete ? '50px' : '0px' }}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
