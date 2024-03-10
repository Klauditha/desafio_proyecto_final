const { faker } = require('@faker-js/faker');
const { bookSchema } = require('../schemas/book.schema');

class BookService {
  constructor() {
    this.books = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for (let index = 0; index < limit; index++) {
      this.books.push({
        bookId: faker.datatype.uuid(),
        isbn: faker.random.alphaNumeric(10),
        img: faker.image.imageUrl(),
        title: faker.commerce.productName(),
        publisher: faker.company.name(),
        pub_date: faker.date.past(),
        price: faker.commerce.price(),
        stock: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
      });
    }
    //console.log(this.books);
  }

  async create(data) {
    const newBook = {
      bookId: faker.datatype.uuid(),
      ...data,
    };
    this.books.push(newBook);
    console.log(this.books);
    return newBook;
  }

  async findOne(bookId) {
    const book = this.books[0];
    console.log(book);
    if (!book) {
      throw new Error('Book not found');
    }
    console.log('book', book);
    return book;
  }
}

module.exports = BookService;
