import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getBooksByAuthor } from '../services/api'; // Import the function

const AuthorDetails = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5200/authors/${id}`);
        setAuthor(response.data);
      } catch (error) {
        setError('Error fetching author details');
        console.error("Error fetching author details:", error);
      }
    };

    const fetchAuthorBooks = async () => {
      try {
        const response = await getBooksByAuthor(id);
        const booksData = response.data;

        // Fetch category data for each book
        const categoryIds = [...new Set(booksData.map(book => book.Category))];
        const categoryPromises = categoryIds.map(categoryId =>
          axios.get(`http://localhost:5200/categories/${categoryId}`)
        );

        const categoryResponses = await Promise.all(categoryPromises);
        const categoriesData = categoryResponses.reduce((acc, categoryResponse) => {
          const category = categoryResponse.data;
          acc[category._id] = category.name;
          return acc;
        }, {});

        setBooks(booksData);
        setCategories(categoriesData);
      } catch (error) {
        setError('Error fetching books');
        console.error("Error fetching books:", error);
      }
    };

    fetchAuthorDetails();
    fetchAuthorBooks();
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!author) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">{author.firstName} {author.lastName}</h2>
      <p>Biography: {author.biography || 'Biography not available.'}</p>
      <h3 className="text-2xl font-bold mt-8">Books by {author.firstName}:</h3>

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
                <p className="text-gray-600 mt-1">Category: {categories[book.Category] || 'Unknown'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No books found for this author.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorDetails;
