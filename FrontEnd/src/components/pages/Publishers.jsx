/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { ECommerceContext } from "../../Context/ECommerceContext";
import Bookcard from "../Bookcard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Publishers = () => {
  const {
    booksEditoriales,
    obtenerLibrosPorEditorial,
    searchBooks,
    editoriales,
  } = useContext(ECommerceContext);
  const [seleccion, setSeleccion] = React.useState("");

  const filterByPublisher = (publisher) => {
    obtenerLibrosPorEditorial(publisher);
  };

  useEffect(() => {
    obtenerLibrosPorEditorial(seleccion);
  }, [searchBooks]);

  return (
    <div>
      <h1 className="font-bold text-xl text-center pt-2">Editoriales</h1>
      <div className="flex flex-row justify-center">
        <div className="w-full md:w-1/2 px-3 mt-8 mb-8 ml-8 md:mb-0">
          <Select>
            <SelectTrigger className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder="Seleccione una editorial" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {editoriales &&
                  editoriales.map((publisher, index) => (
                    <SelectItem key={index} value={publisher}>
                      {publisher}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 md:gap-24 justify-center w-full md:py-8">
        {booksEditoriales
          ? booksEditoriales.map((book) => (
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
          : null}
      </div>
    </div>
  );
};

export default Publishers;
