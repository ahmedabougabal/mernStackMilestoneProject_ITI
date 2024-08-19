import React, { useEffect, useState } from 'react';
import { getCategories } from '../services/api'; // Assuming you have this function

const CategoryList = () => {
  const [categories, setCategories] = useState([]);  // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Use your API function
        if (Array.isArray(response.data.data)) { // Adjust based on API response structure
          setCategories(response.data.data);
        } else {
          throw new Error('Categories data is not an array');
        }
      } catch (err) {
        setError(err.message || 'Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="list-disc pl-5">
        {categories.length > 0 ? (
          categories.map((category) => (
            <li key={category._id} className="mb-2">{category.name}</li>
          ))
        ) : (
          <li>No categories found</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
