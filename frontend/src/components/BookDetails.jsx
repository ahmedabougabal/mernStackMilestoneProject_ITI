import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/api'; // Import your API function

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await getBookById(id); // Use your API function
        setBook(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching book details');
      }
    };
    fetchBookDetails();
  }, [id]);

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!book) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <img src={book.image} alt={book.title} className="w-full h-auto mb-4" />
      <p className="mb-4">{book.description}</p>
      <p className="font-semibold">Author: {book.author.name}</p>
      <p className="font-semibold">Category: {book.category.name}</p> {/* Ensure category name matches your API response */}
    </div>
  );
};

export default BookDetails;

