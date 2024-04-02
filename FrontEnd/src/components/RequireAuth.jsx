import { useContext, useEffect } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { authenticatedUser } = useContext(ECommerceContext);
  const navigate = useNavigate();

  const dataUser = sessionStorage.getItem('username')
    ? JSON.parse(sessionStorage.getItem('username'))
    : null;

  useEffect(() => {
    
    // Check if the user is authenticated
    if (!dataUser) {
      // Redirect to the login page
      console.log("Redirect a login.")
      navigate('/login');
    }
  }, [dataUser, navigate]);

  // If the user is authenticated, render the children
  return dataUser ? children : null;
};

export default RequireAuth;
