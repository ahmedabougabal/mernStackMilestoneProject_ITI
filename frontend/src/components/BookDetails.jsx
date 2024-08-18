import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  return (
    <div>
      {book ? (
        <div>
          <h1>{book.name}</h1>
          <p>Author: {book.author.name}</p>
          <p>Category: {book.category.name}</p>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetails;
