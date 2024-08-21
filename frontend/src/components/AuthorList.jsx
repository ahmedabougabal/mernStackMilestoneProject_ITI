import React, { useState, useEffect } from 'react';
import { getAuthors, addAuthor, deleteAuthor, updateAuthor } from '../services/api'; // Assuming updateAuthor function exists

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', birthDate: '' });
  const [editingAuthorId, setEditingAuthorId] = useState(null); // State for editing mode
  const [editingAuthor, setEditingAuthor] = useState({ firstName: '', lastName: '', birthDate: '' }); // State for editing author data
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

  const handleEditAuthor = (author) => {
    setEditingAuthorId(author._id); // Set the author ID being edited
    setEditingAuthor({ firstName: author.firstName, lastName: author.lastName, birthDate: author.birthDate }); // Pre-fill the input fields with the author's current data
  };

  const handleUpdateAuthor = async () => {
    if (editingAuthor.firstName.trim() && editingAuthor.lastName.trim()) {
      try {
        const response = await updateAuthor(editingAuthorId, editingAuthor);
        setAuthors(
          authors.map((author) =>
            author._id === editingAuthorId ? { ...author, ...editingAuthor } : author
          )
        );
        setEditingAuthorId(null); // Exit editing mode
        setEditingAuthor({ firstName: '', lastName: '', birthDate: '' }); // Clear input fields
      } catch (error) {
        setError(error.message || 'Error updating author');
      }
    } else {
      setError('First name and last name cannot be empty');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Author Management</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-8 text-center">
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
        <button onClick={handleAddAuthor} className="bg-blue-500 text-white px-4 py-2 rounded">Add Author</button>
      </div>

      <table className="w-3/4 mx-auto bg-white text-lg ">
        <thead>
          <tr>
            <th className="py-4 px-6 border-b">ID</th>
            <th className="py-4 px-6 border-b">First Name</th>
            <th className="py-4 px-6 border-b">Last Name</th>
            <th className="py-4 px-6 border-b">Date of Birth</th>
            <th className="py-4 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.length > 0 ? (
            authors.map((author) => (
              <tr key={author._id}>
                <td className="py-4 px-6 border-b">{author._id}</td>
                <td className="py-4 px-6 border-b">
                  {editingAuthorId === author._id ? (
                    <input
                      type="text"
                      value={editingAuthor.firstName}
                      onChange={(e) => setEditingAuthor({ ...editingAuthor, firstName: e.target.value })}
                      className="border p-2"
                    />
                  ) : (
                    author.firstName
                  )}
                </td>
                <td className="py-4 px-6 border-b">
                  {editingAuthorId === author._id ? (
                    <input
                      type="text"
                      value={editingAuthor.lastName}
                      onChange={(e) => setEditingAuthor({ ...editingAuthor, lastName: e.target.value })}
                      className="border p-2"
                    />
                  ) : (
                    author.lastName
                  )}
                </td>
                <td className="py-4 px-6 border-b">
                  {editingAuthorId === author._id ? (
                    <input
                      type="date"
                      value={editingAuthor.birthDate}
                      onChange={(e) => setEditingAuthor({ ...editingAuthor, birthDate: e.target.value })}
                      className="border p-2"
                    />
                  ) : (
                    new Date(author.birthDate).toLocaleDateString('en-CA')
                  )}
                </td>
                <td className="py-4 px-6 border-b">
                  {editingAuthorId === author._id ? (
                    <button onClick={handleUpdateAuthor} className="text-green-500 hover:text-green-700 mr-2">✅</button>
                  ) : (
                    <button onClick={() => handleEditAuthor(author)} className="text-blue-500 hover:text-blue-700 mr-2">✏️</button>
                  )}
                  <button onClick={() => handleDeleteAuthor(author._id)} className="text-red-500 hover:text-red-700">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center">No authors found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorList;
