import { useEffect, useState } from 'react';
import { getBooks } from '../services/api'; 

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => setBooks(response.data.data)) // Access `data` property
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="books-main">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} className="single-book">
            {book.image && <img src={book.image} alt={book.title} className="single-book-img" />}
            <div className="single-book-headers">
              <h2 className="single-book-title">{book.title}</h2>
              <p className="single-book-author">Author: {book.author}</p>
              <p className="single-book-category">Category: {book.category}</p> {/* Adjusted field name */}
            </div>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
}

export default BookList;
