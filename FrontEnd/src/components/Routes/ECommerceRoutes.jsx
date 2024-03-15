/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom';
import New from '../pages/New';
import Bestselling from '../pages/Bestselling';
import Publishers from '../pages/Publishers';
import Wishlist from '../pages/Wishlist';
import Loginpage from '../pages/Loginpage';
import Register from '../Register';
import Cart from '../pages/Cart';
import BookDetail from '../pages/BookDetail';
import { Book } from 'lucide-react';

const ECommerceRoutes = () => {
  return (
    <Routes>
      <Route path="/new" element={<New />} />
      <Route path="/bestselling" element={<Bestselling />} />
      <Route path="/publishers" element={<Publishers />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
  );
};
export default ECommerceRoutes;
