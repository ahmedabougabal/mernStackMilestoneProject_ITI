import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    api.get(`/authors/${id}`)
      .then(response => setAuthor(response.data))
      .catch(error => console.error('Error fetching author details:', error));
  }, [id]);

  return (
    <div>
      {author ? (
        <div>
          <h1>{author.name}</h1>
          <p>Books: {author.books.map(book => book.name).join(', ')}</p>
        </div>
      ) : (
        <p>Loading author details...</p>
      )}
    </div>
  );
};

export default AuthorDetails;
