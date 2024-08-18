import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    api.get('/authors')
      .then(response => setAuthors(response.data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {authors.map(author => <li key={author._id}>{author.name}</li>)}
      </ul>
    </div>
  );
};

export default AuthorList;
