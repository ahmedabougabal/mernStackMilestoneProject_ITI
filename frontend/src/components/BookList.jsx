import React, { useEffect, useState } from 'react';
import api from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => <li key={book._id}>{book.name}</li>)}
      </ul>
    </div>
  );
};

export default BookList;
