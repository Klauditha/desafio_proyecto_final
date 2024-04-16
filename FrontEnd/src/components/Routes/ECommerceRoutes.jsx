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
import Home from '../pages/Home';
import AdminBooks from '../pages/AdminBooks/AdminBooks';
import AddEditBook from '../pages/AdminBooks/AddEditBook';
import Userprofile from '../pages/Userprofile';
import AdminGenres from '../pages/AdminGenre/AdminGenres';
import AdminAuthors from '../pages/AdminAuthor/AdminAuthors';
import CheckoutForm from '../pages/CheckoutForm/CheckoutForm';
import SuccessPayment from '../pages/CheckoutForm/SuccessPayment';

const ECommerceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<New />} />
      <Route path="/bestselling" element={<Bestselling />} />
      <Route path="/publishers" element={<Publishers />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login/*" element={<Loginpage />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/managerbooks" element={<AdminBooks />} />
      <Route path="/managergenres" element={<AdminGenres />} />
      <Route path="/managerauthors" element={<AdminAuthors />} />
      <Route path="/deleteBook" element={<Home />} />
      <Route path="/managerbooks/edit/:book_id" element={<AddEditBook />} />
      <Route path="/managerbooks/add" element={<AddEditBook />} />
      <Route path="/profile" element={<Userprofile />} />
      <Route path="/ok" element={<SuccessPayment />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/success" element={<SuccessPayment />} />
    </Routes>
  );
};
export default ECommerceRoutes;
