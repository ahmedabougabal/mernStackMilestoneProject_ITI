import React, { useState, useEffect } from 'react';
import { getAuthors } from '../services/api';
import { Link } from 'react-router-dom';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

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

  // Filter authors based on the search term
  const filteredAuthors = authors.filter(
    (author) =>
      author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Author List</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Search Input */}
      <div className="w-3/4 mx-auto mb-4">
        <input
          type="text"
          placeholder="Search authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

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
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author, index) => (
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
