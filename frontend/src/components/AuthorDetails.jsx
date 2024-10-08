import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getBooksByAuthor } from '../services/api';

const AuthorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);
  const placeholderImage = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";

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

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!author) return <div className="p-4">Loading...</div>;

  // Navigate to CategoryDetails page 
  const handleCategoryClick = (categoryId) => {
    navigate(`/categories/${categoryId}`); 
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{author.firstName} {author.lastName}</h2>
      <p className="text-lg mb-4 text-gray-700">
        {`Welcome, dear reader! ${author.firstName} ${author.lastName} is thrilled to share their work with you.`}
      </p>
      <p className="text-gray-600 mb-8">
        <strong>Birth Date:</strong> {new Date(author.birthDate).toDateString()}
      </p>
      
      <h3 className="text-2xl font-semibold mb-4">Books by {author.firstName}:</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="w-full h-64 overflow-hidden">
              <Link to={`/books/details/${book._id}`}>  
                <img
                  src={book.image || placeholderImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                </Link>
              </div>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                <p
                  className="text-blue-600 mt-2 cursor-pointer hover:underline"
                  onClick={() => handleCategoryClick(book.Category)}
                >
                  Category: {categories[book.Category] || 'Unknown'}
                </p>
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
