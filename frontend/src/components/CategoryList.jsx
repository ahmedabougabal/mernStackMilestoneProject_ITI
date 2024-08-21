import React, { useEffect, useState } from 'react';
import { getCategories, addCategory, deleteCategory, updateCategory } from '../services/api'; // Assuming updateCategory function exists
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null); // New state for editing mode
  const [editingCategoryName, setEditingCategoryName] = useState(''); // New state for editing category name
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        throw new Error('Categories data is not an array');
      }
    } catch (err) {
      setError(err.message || 'Error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const response = await addCategory({ name: newCategoryName.trim() });
        setCategories([...categories, response.data]); // Add new category to list
        setNewCategoryName(''); // Clear input field
      } catch (err) {
        setError(err.message || 'Error adding category');
      }
    } else {
      setError('Category name cannot be empty');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((category) => category._id !== id)); // Remove deleted category
    } catch (err) {
      setError(err.message || 'Error deleting category');
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id); // Set the category ID that is being edited
    setEditingCategoryName(category.name); // Set the current name in the input field
  };

  const handleUpdateCategory = async () => {
    if (editingCategoryName.trim()) {
      try {
        const response = await updateCategory(editingCategoryId, { name: editingCategoryName.trim() });
        setCategories(
          categories.map((category) =>
            category._id === editingCategoryId ? { ...category, name: editingCategoryName } : category
          )
        );
        setEditingCategoryId(null); // Exit editing mode
        setEditingCategoryName(''); // Clear input field
      } catch (err) {
        setError(err.message || 'Error updating category');
      }
    } else {
      setError('Category name cannot be empty');
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="mt-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category Name"
          className="border px-4 py-2 mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Category
        </button>
      </div>

      <table className="table-auto w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{category._id}</td>
                <td className="border px-4 py-2">
                  {editingCategoryId === category._id ? (
                    <input
                      type="text"
                      value={editingCategoryName}
                      onChange={(e) => setEditingCategoryName(e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    <Link to={`/categories/${category._id}`} className="text-blue-500 hover:underline">
                      {category.name}
                    </Link>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingCategoryId === category._id ? (
                    <button
                      onClick={handleUpdateCategory}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      ✅
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
