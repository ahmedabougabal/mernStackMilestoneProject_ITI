import { useEffect, useState } from 'react';
import { getBooks } from '../services/api';

// Placeholder image URL (replace with your own placeholder image)
const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => setBooks(response.data.data)) // Access `data` property
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <p className="text-gray-600 mt-1">Author: {book.author}</p>
              <p className="text-gray-600 mt-1">Category: {book.category}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No books available</p>
      )}
    </div>
  );
}

export default BookList;
