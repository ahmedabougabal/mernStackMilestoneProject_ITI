import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api'; // Assuming updateCategory function exists
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const UScategoryList = () => {
  const [categories, setCategories] = useState([]);
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

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <table className="table-auto w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">No.</th>
            <th className="border px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <Link to={`/categories/${category._id}`} className="text-blue-500 hover:underline">
                    {category.name}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UScategoryList;
