import React, { useState } from 'react';
import BookList from '../components/BookList';
const booksData = [
  { cover: '📘', name: 'Oliver Twist', author: 'Dickens', avgRate: 3, rating: 4, shelf: 'read' },
  { cover: '📘', name: 'Still Lives', author: 'Maria H.', avgRate: 2, rating: 5, shelf: 'reading' },
  { cover: '📘', name: 'The Blue', author: 'Nancy B.', avgRate: 1, rating: 3, shelf: 'want to read' },
];

function HomePage() {
  const [currentPage, setCurrentPage] = useState(2);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <h1>Welcome to Goodreads Clone</h1>
      <div className="flex">
      <div className="w-48 p-4">
        <ul className="space-y-2">
          <li className="cursor-pointer">All</li>
          <li className="cursor-pointer">Read</li>
          <li className="cursor-pointer">Currently Reading</li>
          <li className="cursor-pointer">Want To Read</li>
        </ul>
      </div>
      <div className="flex-grow p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Cover</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Author</th>
              <th className="border px-4 py-2 text-left">Avg Rate</th>
              <th className="border px-4 py-2 text-left">Rating</th>
              <th className="border px-4 py-2 text-left">Shelf</th>
            </tr>
          </thead>
          <tbody>
            {booksData.map((book, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{book.cover}</td>
                <td className="px-4 py-2 text-blue-500 cursor-pointer">{book.name}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">
                  {'★'.repeat(book.avgRate)}{'☆'.repeat(5 - book.avgRate)}
                </td>
                <td className="px-4 py-2">
                  {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                </td>
                <td className="px-4 py-2">
                  <select className="border rounded p-1" value={book.shelf}>
                    <option value="read">read</option>
                    <option value="reading">reading</option>
                    <option value="want to read">want to read</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 space-x-2">
          <button 
            onClick={() => handlePageChange(1)} 
            className="px-3 py-1 border rounded bg-gray-200"
          >
            {'<'}
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(3)} 
            className="px-3 py-1 border rounded bg-gray-200"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
      <BookList />

    </div>
  );
}

export default HomePage;


