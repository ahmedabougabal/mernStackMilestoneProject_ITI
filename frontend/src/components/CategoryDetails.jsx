import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState({});
  const [error, setError] = useState(null);
  const placeholderImage = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";

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
        const booksData = response.data;

        // Fetch author data for each book
        const authorIds = [...new Set(booksData.map(book => book.AuthorId))];
        const authorPromises = authorIds.map(authorId =>
          axios.get(`http://localhost:5200/authors/${authorId}`)
        );

        const authorResponses = await Promise.all(authorPromises);
        const authorsData = authorResponses.reduce((acc, authorResponse) => {
          const author = authorResponse.data;
          acc[author._id] = `${author.firstName} ${author.lastName}`;
          return acc;
        }, {});

        setBooks(booksData);
        setAuthors(authorsData);
      } catch (error) {
        setError('Error fetching books');
        console.error("Error fetching books:", error);
      }
    };

    fetchCategoryDetails();
    fetchCategoryBooks();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!category) return <div className="p-4">Loading...</div>;

  const handleAuthorClick = (authorId) => {
    navigate(`/authors/${authorId}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Category: {category.name}</h2>
      <h3 className="text-2xl font-semibold mb-8">Books in this category:</h3>
  
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
                  onClick={() => handleAuthorClick(book.AuthorId)}
                >
                  by {authors[book.AuthorId] || 'Unknown Author'}
                </p>
                <p className="text-gray-600 mt-2">{book.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No books related to this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
