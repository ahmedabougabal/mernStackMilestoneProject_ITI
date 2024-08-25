import { useEffect, useState } from 'react';
import Spinner from './Spinner.jsx';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getBooks, getAuthors, getCategories, getAllList } from '../services/api';

const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';

function HomeBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [authorname, setAuthorname] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryname, setCategoryname] = useState({});

  useEffect(() => {
    setLoading(true);
    getBooks()
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

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
    authors.forEach((auth) => {
      setAuthorname((pre) => ({ ...pre, [auth._id]: `${auth.firstName} ${auth.lastName}` }));
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
    categories.forEach((cat) => {
      setCategoryname((pre) => ({ ...pre, [cat._id]: cat.name }));
    });
  }, [categories]);

  const getauthValue = (key) => authorname[key] || key;
  const getcatValue = (key) => categoryname[key] || key;

  const onButtonClick = (bookId, authorId) => {
    const IdUser = localStorage.getItem('IdUser');
    const fetchlistuser = async () => {
      try {
        await getAllList({
          user: IdUser,
          author: authorId,
          book: bookId,
          status: 'read',
        });
      } catch (error) {
        console.error('Error updating books:', error);
      }
    };
    fetchlistuser();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-60 overflow-hidden">
                  <Link to={`/books/details/${book._id}`}>
                    <img
                      src={book.image || placeholderImage}
                      alt={book.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                <StarRating rating={book.rating} />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{book.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Author: {getauthValue(book.AuthorId)}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {getcatValue(book.Category)}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => onButtonClick(book._id, book.AuthorId)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Add to Shelf
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No books available</p>
          )}
        </div>
      )}
    </>
  );
}

export default HomeBook;