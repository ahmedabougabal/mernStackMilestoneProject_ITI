import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from './Spinner.jsx';
import AddAndUpdate from './AddAndUpdate';
import BookDetails from './BookDetails.jsx';
import { getBooks } from '../services/api'; 

// Placeholder image URL (replace with your own placeholder image)
const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';


function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);



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
  }, [changed]);



    function deleted(deletedBookId){
    setLoading(true);
    axios.delete(`http://localhost:5200/books/${deletedBookId}`)
      .then((response) => {
        setLoading(false);
        setChanged((state)=> !state)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }



// if(loading){
//   return <Spinner />;
// }

  return (
    <>
    <div className='flex justify-between items-center'>
    <h1 className='text-3xl my-8'>Books List</h1>
      <MdOutlineAddBox onClick={() => setShowModal(true)} className='text-sky-800 text-4xl' />
  </div>
  {loading ? (
   <Spinner />) :(
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
           {book.image && <img src={book.image || placeholderImage} alt={book.title} className="w-1/3 h-1/2 object-cover" />}
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
            {book.AuthorId}
            {/* {book.author} */}

          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            <div className='flex justify-center gap-x-4'>
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className='text-2xl text-green-800' />
              </Link>
                <AiOutlineEdit onClick={() => setShowModal(true)} className='text-2xl text-yellow-600' />
                <MdOutlineDelete onClick={()  => deleted(book._id)} className='text-2xl text-red-600' />
            </div>
            {showModal && (
        <AddAndUpdate book={book} onClose={() =>{ setShowModal(false);setChanged((state)=> !state)} }/>
      )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
        )}
  </>


    // <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    //   {books.length > 0 ? (
    //     books.map((book) => (
    //       <div
    //         key={book._id}
    //         className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
    //       >
    //         <div className="w-full h-64 overflow-hidden">
    //           <img
    //             src={book.image || placeholderImage} // Use placeholder image if no book image
    //             alt={book.title}
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //         <div className="p-4 flex-1">
    //           <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
    //           <p className="text-gray-600 mt-1">Author: {book.author}</p>
    //           <p className="text-gray-600 mt-1">Category: {book.category}</p>
    //         </div>
    //       </div>
    //     ))
    //   ) : (
    //     <p className="text-gray-600">No books available</p>
    //   )}
    // </div>
  );
}

export default BookList;
