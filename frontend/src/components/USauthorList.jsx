import React, { useState, useEffect } from 'react';
import { getAuthors } from '../services/api';
import { Link } from 'react-router-dom';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        setAuthors(response.data.data);
      } catch (error) {
        setError(error.message || 'Error fetching authors');
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Author List</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="w-3/4 mx-auto bg-white text-lg">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b">No.</th>
            <th className="py-4 px-6 border-b">First Name</th>
            <th className="py-4 px-6 border-b">Last Name</th>
            <th className="py-4 px-6 border-b">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author, index) => (
              <tr key={author._id}>
                <td className="py-4 px-6 border-b text-center">{index + 1}</td>
                <td className="py-4 px-6 border-b">
                  <Link to={`/authors/${author._id}`} className="text-blue-500 hover:underline">
                    {author.firstName}
                  </Link>
                </td>
                <td className="py-4 px-6 border-b">
                  <Link to={`/authors/${author._id}`} className="text-blue-500 hover:underline">
                    {author.lastName}
                  </Link>
                </td>
                <td className="py-4 px-6 border-b">
                  <Link to={`/authors/${author._id}`} className="text-blue-500 hover:underline">
                    {new Date(author.birthDate).toLocaleDateString('en-CA')}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 px-6 text-center">No authors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorList;
