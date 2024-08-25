import React, { useState, useEffect } from 'react';
import { getUserList, updateUserList } from '../services/api'; // Import your API function
import StarRating from './StarRating';


const initialBooksData = [];

function Shelf() {
const [books, setBooks] = useState(initialBooksData);
const [currentPage, setCurrentPage] = useState(1);
const [selectedCategory, setSelectedCategory] = useState('All');
const itemsPerPage = 7; // Number of items to show per page

const handlePageChange = (page) => {
setCurrentPage(page);
};

const handleCategoryChange = (category) => {
console.log(`Category clicked: ${category}`);
setSelectedCategory(category);
setCurrentPage(1); // Reset to the first page when category changes
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
        console.log(initialBooksData);

    } catch (error) {
    console.log(error);
    }
};

fetchlistuser();
}, [IdUser]);

useEffect(() => {
if (books !== initialBooksData) {
    const updateBooks = async () => {
    try {
        const response = await updateUserList(IdUser, books);
        console.log('Updated Books in DB:', response.data);
    } catch (error) {
        console.error('Error updating books:', error);
    }
    };
    updateBooks();
}
}, [books]);

const handleShelfChange = (id, newShelf) => {
const updatedBooks = books.map((book) => {
    if (book._id === id) { // Use the unique `_id` field to identify the specific book
    console.log(book._id);
    return { ...book, status: newShelf };
    }
    return book;
});
    setBooks(updatedBooks);
    console.log('Updated Books:', updatedBooks);
};

const filteredBooks = books.filter((book) => {
if (selectedCategory === 'All') return true;
return book.status === selectedCategory.toLowerCase().replace(' ', '');
});

// Calculate the indices for slicing the array
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

// Calculate total number of pages
const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

return (
<div>

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
                <th className="border px-4 py-2 text-left">Rating</th>
                <th className="border px-4 py-2 text-left">Author</th>
                <th className="border px-4 py-2 text-left">Shelf</th>
            </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">
                    {book.book ? <img src={book.book.image} alt={book.book.title} className="w-12 h-12" /> : 'No Cover'}
                  </td>
                  <td className="px-4 py-2 text-blue-500 cursor-pointer">
                    {book.book ? (
                      <a href={`http://localhost:5173/books/details/${book.book._id}`} className="hover:underline">
                        {book.book.title}
                      </a>
                    ) : 'No Title'}
                  </td>
                  <td className="px-4 py-2">
                  <StarRating rating={book.book.rating} />
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
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
              className="px-3 py-1 border rounded bg-gray-200"
            >
              {'<'}
            </button>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex + 1)}
                className={`px-3 py-1 border rounded ${currentPage === pageIndex + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {pageIndex + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
              className="px-3 py-1 border rounded bg-gray-200"
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shelf;