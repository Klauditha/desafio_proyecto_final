/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const New = () => {
  const { books } = useContext(ECommerceContext);

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Novedades</h1>
      <h2 className="text-md font-bold text-center mb-4">Del 2024</h2>
      <div className="grid grid-auto-cols gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between">
        {books
          .filter((book) => new Date(book.pubDate).getFullYear() == '2024')
          .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
          .map((book) => (
            <Bookcard
              key={book.bookId}
              book={book}
              btnAddCart={true}
              displayPrice={true}
              displayLanguage={false}
              displayQuantitySold={false}
              displayPubDate={true}
            />
          ))}
      </div>
    </div>
  );
};

export default New;
