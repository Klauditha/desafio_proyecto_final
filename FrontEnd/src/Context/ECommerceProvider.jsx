/* eslint-disable react/prop-types */
import { ECommerceContext } from './ECommerceContext';
import { useState, useEffect } from 'react';

export const ECommerceProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {}, []);

  return (
    <ECommerceContext.Provider value={{cart, setCart}}>{children}</ECommerceContext.Provider>
  );
};
