/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';
import RequireAuth from '../RequireAuth';

const Wishlist = () => {
  const { books, wishlist } = useContext(ECommerceContext);
  const wishlistBookIds = wishlist.map((item) => item.book_id);
  const booksWishlist = null;
  
  return (
    <RequireAuth>
      <div>
        <h1 className="font-bold text-xl text-center">Lista de deseos</h1>
        <div className="grid grid-auto-cols gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between mt-8">
          {booksWishlist ? (
            booksWishlist.map((book) => (
              <Bookcard
                key={book.book_id}
                book={book}
                btnAddCart={true}
                displayPrice={true}
                displayLanguage={false}
                displayQuantitySold={false}
                displayPubDate={true}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No se encontraron resultados</p>
          )}
        </div>
      </div>
    </RequireAuth>
  );
};

export default Wishlist;
