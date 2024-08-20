import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const { id } = useParams(); // Get the category ID from the URL params
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5200/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        setError('Error fetching category details');
        console.error("Error fetching category details:", error);
      }
    };

    const fetchCategoryBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5200/books/category/${id}`);
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books');
        console.error("Error fetching books:", error);
      }
    };

    fetchCategoryDetails();
    fetchCategoryBooks();
  }, [id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!category) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Category: {category.name}</h2>
      <h3 className="text-2xl font-bold mt-8">Books in this category:</h3>
  
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={book.image || placeholderImage} // Use placeholder image if no book image
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                {book.author && book.author.firstName && book.author.lastName ? (
                  <p className="text-gray-600 mt-1">
                    by {book.author.firstName} {book.author.lastName}
                  </p>
                ) : (
                  <p className="text-gray-600 mt-1">Author information not available</p>
                )}
                <p className="text-gray-600 mt-1">{book.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No books found for this category.</p>
        )}
      </div>
    </div>
  );
  
};

export default CategoryDetails;
