import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => <li key={category._id}>{category.name}</li>)}
      </ul>
    </div>
  );
};

export default CategoryList;
