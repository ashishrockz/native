import React from 'react';
import { AuthProvider } from './src/Hooks/Authentication'; // Import AuthProvider
import MainNavigation from './src/navigations/MainNavigation';

const App = () => {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
};

export default App;
