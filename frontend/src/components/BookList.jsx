import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from './Spinner.jsx';
import AddAndUpdate from './AddAndUpdate';
import BookDetails from './BookDetails.jsx';
import { getBooks , getAuthors ,getCategories} from '../services/api'; 

const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showType, setShowType] = useState("");
  const [showBk, setShowBk] = useState("");
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [authorname, setAuthorname] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryname, setCategoryname] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooks();
        setBooks(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message || 'Error fetching Books');
        setLoading(false);
      }
    };
    fetchBooks();
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

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        setAuthors(response.data.data);
      } catch (error) {
        setError(error.message || 'Error fetching authors');
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    authors.forEach(auth => {
      setAuthorname(prev => ({ ...prev, [auth._id]: `${auth.firstName} ${auth.lastName}` }));
    });
  }, [authors]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message || 'Error fetching Categories');
      }
    };
    fetchCat();
  }, []);

  useEffect(() => {
    categories.forEach(auth => {
      setCategoryname(prev => ({ ...prev, [auth._id]: auth.name }));
    });
  }, [categories]);

  const getauthValue = (key) => authorname[key] || key;
  const getcatValue = (key) => categoryname[key] || key;

  return (
    <>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-bold text-gray-800'>Books List</h1>
        <MdOutlineAddBox 
          onClick={() => { setShowModal(true); setShowType("add"); setShowBk("add"); }} 
          className='text-green-600 text-5xl hover:text-green-800 cursor-pointer transition duration-300'
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-100'>
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
                <tr key={book._id} className='border-t hover:bg-gray-50 transition duration-200'>
                  <td className='p-4 text-sm text-gray-700'>{index + 1}</td>
                  <td className='p-4 text-sm text-gray-700 max-md:hidden'>
                    <img 
                      src={book.image || placeholderImage} 
                      alt={book.title} 
                      className="w-16 h-20 object-cover rounded"
                    />
                  </td>
                  <td className='p-4 text-sm text-gray-700'>{book.title}</td>
                  <td className='p-4 text-sm text-gray-700 max-md:hidden'>{getcatValue(book.Category)}</td>
                  <td className='p-4 text-sm text-gray-700 max-md:hidden'>{getauthValue(book.AuthorId)}</td>
                  <td className='p-4 text-sm text-gray-700'>
                    <div className='flex items-center space-x-4'>
                      <Link to={`/books/details/${book._id}`} className='text-blue-500 hover:text-blue-700'>
                        <BsInfoCircle className='text-2xl' />
                      </Link>
                      <AiOutlineEdit 
                        onClick={() => { setShowModal(true); setShowType("update"); setShowBk(book._id); }} 
                        className='text-yellow-500 hover:text-yellow-700 cursor-pointer transition duration-300'
                      />
                      <MdOutlineDelete 
                        onClick={() => deleted(book._id)} 
                        className='text-red-500 hover:text-red-700 cursor-pointer transition duration-300'
                      />
                    </div>
                    {showModal && (showBk === "add" || showBk === book._id) && (
                      <AddAndUpdate 
                        book={book} 
                        onClose={() => { setShowModal(false); setChanged(prev => !prev); }} 
                        type={showType} 
                      />
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
