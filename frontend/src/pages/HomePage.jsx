import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import { getUserList } from '../services/api'; // Import your API function

const initialBooksData = [];

function HomePage() {
  const [books, setBooks] = useState(initialBooksData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    console.log(`Category clicked: ${category}`);
    setSelectedCategory(category);
  };

  const IdUser = localStorage.getItem("IdUser");

  useEffect(() => {
    const fetchlistuser = async () => {
      try {
        const response = await getUserList(IdUser); // Use your API function
        console.log(response.data[0].items);
        
        const apiData = response.data[0].items; // Assuming the data comes in this format

        // Replace the initialBooksData with the data fetched from the API
        setBooks(apiData);
        console.log(initialBooksData)

      } catch (error) {
        console.log(error);
      }
    };

    fetchlistuser();
  }, [IdUser]);

  const handleShelfChange = (id, newShelf) => {
    const updatedBooks = books.map((book) => {
      if (book._id === id) { // Use the unique `_id` field to identify the specific book
        console.log(book._id)
        return { ...book, status: newShelf };
      }
      return book;
    });
    setBooks(updatedBooks);
    console.log('Updated Books:', updatedBooks );
  };

  const filteredBooks = books.filter((book) => {
    if (selectedCategory === 'All') return true;
    return book.status === selectedCategory.toLowerCase().replace(' ', '');
  });

  return (
    <div>
      <h1>Welcome to Goodreads Clone</h1>

      <div className="flex">
        <div className="w-48 p-4">
          <ul className="space-y-2">
            <li className="cursor-pointer" onClick={() => handleCategoryChange('All')}>All</li>
            <li className="cursor-pointer" onClick={() => handleCategoryChange('read')}>Read</li>
            <li className="cursor-pointer" onClick={() => handleCategoryChange('reading')}>Currently Reading</li>
            <li className="cursor-pointer" onClick={() => handleCategoryChange('want')}>Want To Read</li>
          </ul>
        </div>
        <div className="flex-grow p-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Cover</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Author</th>
                <th className="border px-4 py-2 text-left">Shelf</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {book.book ? <img src={book.book.image} alt={book.book.title} className="w-12 h-12" /> : 'No Cover'}
                  </td>
                  <td className="px-4 py-2 text-blue-500 cursor-pointer">
                    {book.book ? book.book.title : 'No Title'}
                  </td>
                  <td className="px-4 py-2">
                    {book.author ? `${book.author.firstName} ${book.author.lastName}` : 'Unknown Author'}
                  </td>
                  <td className="px-4 py-2">
                    <select 
                      className="border rounded p-1" 
                      value={book.status} 
                      onChange={(e) => handleShelfChange(book._id, e.target.value)}
                    >
                      <option value="read">read</option>
                      <option value="reading">reading</option>
                      <option value="want">want to read</option>
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
