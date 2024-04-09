/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';
import RequireAuth from '../RequireAuth';

const Wishlist = () => {
  const { fetchWishlistBooks } = useContext(ECommerceContext);
  const [booksWishlist, setBooksWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistBooks = await fetchWishlistBooks();
        setBooksWishlist(wishlistBooks);
      } catch (error) {
        console.error("Error consiguiendo los libros de la wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [fetchWishlistBooks]);

  return (
    <RequireAuth>
      <div>
        <h1 className="font-bold text-xl text-center">Lista de deseos</h1>
        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando...</p>
        ) : (
          <div className="grid grid-auto-cols gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between mt-8">
            {booksWishlist && booksWishlist.length > 0 ? (
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
              <p style={{ textAlign: "center" }}>
                No hay libros en la lista de deseos
              </p>
            )}
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Wishlist;
