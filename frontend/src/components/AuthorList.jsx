import React, { useState, useEffect } from 'react';
import { getAuthors } from '../services/api'; // Import your API function

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors(); // Use your API function
        if (Array.isArray(response.data.data)) { // Adjust based on your API response structure
          setAuthors(response.data.data);
        } else {
          throw new Error('Authors data is not an array');
        }
      } catch (error) {
        setError(error.message || 'Error fetching authors');
      }
    };

    fetchAuthors();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Author List</h2>
      <ul className="list-disc pl-5">
        {authors.length > 0 ? (
          authors.map(author => (
            <li key={author._id} className="mb-2">{author.first_name}</li> // Adjust field names based on API response
          ))
        ) : (
          <li>No authors found</li>
        )}
      </ul>
    </div>
  );
};

export default AuthorList;
