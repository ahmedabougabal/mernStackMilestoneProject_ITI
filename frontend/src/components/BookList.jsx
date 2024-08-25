import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from './Spinner.jsx';
import AddAndUpdate from './AddAndUpdate';
import { getBooks, getAuthors, getCategories } from '../services/api'; 

const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showType, setShowType] = useState("");
  const [showBk, setShowBk] = useState("");
  const [error, setError] = useState(null);
  const [authorname, setAuthorname] = useState({});
  const [categoryname, setCategoryname] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooks();
        setBooks(response.data.data);
      } catch (error) {
        setError(error.message || 'Error fetching Books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [changed]);

  const deleted = async (deletedBookId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5200/books/${deletedBookId}`);
      setChanged(state => !state);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const [authorsResponse, categoriesResponse] = await Promise.all([getAuthors(), getCategories()]);
        const authors = authorsResponse.data.data;
        const categories = categoriesResponse.data.data;

        const authorMap = {};
        authors.forEach(auth => {
          authorMap[auth._id] = `${auth.firstName} ${auth.lastName}`;
        });
        setAuthorname(authorMap);

        const categoryMap = {};
        categories.forEach(cat => {
          categoryMap[cat._id] = cat.name;
        });
        setCategoryname(categoryMap);
      } catch (error) {
        setError(error.message || 'Error fetching authors or categories');
      }
    };
    fetchAuthorsAndCategories();
  }, []);

  const getAuthorName = (key) => authorname[key] || key;
  const getCategoryName = (key) => categoryname[key] || key;

  return (
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <MdOutlineAddBox onClick={() => { setShowModal(true); setShowType("add"); setShowBk("add"); }} className='text-sky-800 text-5xl' />
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="p-4 text-red-500">Error: {error}</div>
      ) : (
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow-lg">
          <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='p-4 text-left text-sm font-semibold text-gray-600'>No</th>
                <th className='p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden'>Image</th>
                <th className='p-4 text-left text-sm font-semibold text-gray-600'>Title</th>
                <th className='p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden'>Category</th>
                <th className='p-4 text-left text-sm font-semibold text-gray-600 max-md:hidden'>Author</th>
                <th className='p-4 text-left text-sm font-semibold text-gray-600'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden flex justify-center p-0'>
                    <img src={book.image || placeholderImage} alt={book.title} className="w-1/3 h-1/2 object-cover" />
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {getCategoryName(book.Category)}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                    {getAuthorName(book.AuthorId)}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <AiOutlineEdit onClick={() => { setShowModal(true); setShowType("update"); setShowBk(book._id); }} className='text-2xl text-yellow-600' />
                      <MdOutlineDelete onClick={() => deleted(book._id)} className='text-2xl text-red-600' />
                    </div>
                    {showModal && (showBk === "add" || showBk === book._id) && (
                      <AddAndUpdate book={book} onClose={() => { setShowModal(false); setChanged(state => !state); }} type={showType} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default BookList;
