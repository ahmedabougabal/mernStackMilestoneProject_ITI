import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { getBooks } from '../services/api'; 


function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5200/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return (
    // <div className="books-main">
    //   {books.length > 0 ? (
    //     books.map((book) => (
    //       <div key={book._id} className="single-book">
    //         {book.image && <img src={book.image} alt={book.title} className="single-book-img" />}
    //         <div className="single-book-headers">
    //           <h2 className="single-book-title">{book.title}</h2>
    //           <p className="single-book-author">Author: {book.author}</p>
    //           <p className="single-book-category">Category: {book.category}</p> {/* Adjusted field name */}
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     <p>No books available</p>
    //   )}
    // </div>

    <table className='w-full border-separate border-spacing-2'>
    <thead>
      <tr>
        <th className='border border-slate-600 rounded-md'>No</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>
          image
        </th>
        <th className='border border-slate-600 rounded-md'>Title</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>
          Category
        </th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>
          Author
        </th>
        <th className='border border-slate-600 rounded-md'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {books.map((book, index) => (
        <tr key={book._id} className='h-8'>
          <td className='border border-slate-700 rounded-md text-center'>
            {index + 1}
          </td>
          <td className='border border-slate-700 rounded-md text-center max-md:hidden flex justify-center p-0'>
           {book.image && <img src={book.image} alt={book.title} className="single-book-img" />}
          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            {/* {book.name} */}
            {book.title}
          </td>
          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {/* {book.Category} */}
            {book.categories}

          </td>
          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {/* {book.AuthorId} */}
            {book.author}

          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            <div className='flex justify-center gap-x-4'>
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className='text-2xl text-green-800' />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className='text-2xl text-yellow-600' />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className='text-2xl text-red-600' />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>




  );
}

export default BookList;
