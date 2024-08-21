import HomeBook from '../components/HomeBook';
import React, { useState ,useEffect } from 'react';
import { getUserList } from '../services/api';  
// import BookList from '../components/BookList';


const initialBooksData = [
  { id: 1, cover: '📘', name: 'Oliver Twist', author: 'Dickens', avgRate: 3, rating: 4, shelf: 'read' },
  { id: 2, cover: '📘', name: 'Still Lives', author: 'Maria H.', avgRate: 2, rating: 5, shelf: 'reading' },
  { id: 3, cover: '📘', name: 'The Blue', author: 'Nancy B.', avgRate: 1, rating: 3, shelf: 'want' },
];

function HomePage() {
  const [books, setBooks] = useState(initialBooksData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const IdUser = localStorage.getItem("IdUser")

  useEffect(() => {
    const fetchlistuser = async () => {
      try {
        const response = await getUserList(IdUser);  // Use your API function
        console.log(response.data[0].items)
        
      } catch (error) {
        console.log(error)
      }
    };

    fetchlistuser();
  }, [IdUser]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    console.log(`Category clicked: ${category}`);
    setSelectedCategory(category);
  };

  const handleShelfChange = (id, newShelf) => {
    const updatedBooks = books.map(book => {
      if (book.id === id) {
        return { ...book, shelf: newShelf };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const filteredBooks = books.filter((book) => {
    if (selectedCategory === 'All') return true;
    return book.shelf === selectedCategory.toLowerCase().replace(' ', '');
  });

  return (
    <div>
      <h1>Welcome to Goodreads Clone</h1>

       <div className="flex">
       <div className="w-48 p-4">
         <ul className="space-y-2">
           <li className="cursor-pointer" onClick={() => handleCategoryChange('All')}>All</li>
           <li className="cursor-pointer" onClick={() => handleCategoryChange('Read')}>Read</li>
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
               <th className="border px-4 py-2 text-left">Avg Rate</th>
               <th className="border px-4 py-2 text-left">Rating</th>
               <th className="border px-4 py-2 text-left">Shelf</th>
             </tr>
           </thead>
           <tbody>
             {filteredBooks.map((book, index) => (
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
                   <select 
                     className="border rounded p-1" 
                     value={book.shelf} 
                     onChange={(e) => handleShelfChange(book.id, e.target.value)}
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


     <HomeBook />
    </div>
  );


}

export default HomePage;


