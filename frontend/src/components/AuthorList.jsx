import React, { useState, useEffect } from 'react';
import { getAuthors, addAuthor, deleteAuthor } from '../services/api';

const AuthorManagement = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', birthDate: '' });
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

  const handleAddAuthor = async () => {
    try {
      const response = await addAuthor(newAuthor);
      setAuthors([...authors, response.data]);
      setNewAuthor({ firstName: '', lastName: '', birthDate: '' });
    } catch (error) {
      setError(error.message || 'Error adding author');
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await deleteAuthor(id);
      setAuthors(authors.filter(author => author._id !== id));
    } catch (error) {
      setError(error.message || 'Error deleting author');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Author Management</h2>

      {error && <div className="text-red-500">{error}</div>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="First Name"
          value={newAuthor.firstName}
          onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newAuthor.lastName}
          onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={newAuthor.birthDate}
          onChange={(e) => setNewAuthor({ ...newAuthor, birthDate: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddAuthor} className="bg-blue-500 text-white px-4 py-2">Add Author</button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Date of Birth</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author) => (
              <tr key={author._id}>
                <td className="py-2 px-4 border-b">{author._id}</td>
                <td className="py-2 px-4 border-b">{author.firstName}</td>
                <td className="py-2 px-4 border-b">{author.lastName}</td>
                <td className="py-2 px-4 border-b">{author.birthDate}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleDeleteAuthor(author._id)} className="text-red-500">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">No authors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorManagement;
