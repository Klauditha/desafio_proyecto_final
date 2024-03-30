/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';
import { ECommerceProvider } from '@/Context/ECommerceProvider';
import ECommerceRoutes from './components/Routes/ECommerceRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ECommerceProvider>
      <AppContent />
    </ECommerceProvider>
  );
}

function AppContent() {
  const {
    setearDataUserAuth,
    dataAuthenticatedUser,
    authenticatedUser,
    setDataAuthenticatedUser,
    setAuthenticatedUser,
  } = useContext(ECommerceContext);

  useEffect(() => {
    if (sessionStorage.getItem('username') != null) {
      setearDataUserAuth();
    } else {
      setAuthenticatedUser(null);
      setDataAuthenticatedUser(null);
    }
  }, [authenticatedUser]);

  return (
    <div className="flex-col space-y-8">
      <Navbar />
      <ECommerceRoutes />
      <Footer />
    </div>
  );
}

export default App;
