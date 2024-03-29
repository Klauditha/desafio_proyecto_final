import { useContext, useEffect, useState } from 'react';
import Bookcard from '../../Bookcard';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminBooks = () => {
  const { books, searchBooks, filterBySearch } = useContext(ECommerceContext);
  const [booksAdmin, setBookAmin] = useState([books]);
  const navigate = useNavigate();

  useEffect(() => {
    setBookAmin(filterBySearch());
  }, [searchBooks]);
  return (
    <div>
      <h1 className="font-bold text-xl text-center">Mantenedor Libros</h1>
      <div
        className="flex justify-center pl-8 mt-4 mb-4"
        onClick={() => navigate('/managerbooks/add')}
      >
        <Button size="sm" className="bg-blue-500">
          Añadir libro
        </Button>
      </div>
      <div className="grid grid-auto-cols gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between">
        {booksAdmin
          ? booksAdmin.map((book) => (
              <Bookcard
                key={book.bookId}
                book={book}
                btnEditBook={true}
                btnDeleteBook={false}
                displayLanguage={true}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminBooks;
