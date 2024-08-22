import { useEffect, useState } from 'react';
import Spinner from './Spinner.jsx';
import { Link } from 'react-router-dom';
import { getBooks, getAuthors ,getCategories } from '../services/api';

// Placeholder image URL (replace with your own placeholder image)
const placeholderImage = 'https://via.placeholder.com/300x400?text=Image+Not+Found';

function HomeBook() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [authorname, setAuthorname] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryname, setCategoryname] = useState({});

  useEffect(() => {
    getBooks()
      .then((response) => setBooks(response.data.data)) // Access `data` property
      .catch((error) => console.error('Error fetching books:', error));
  }, []);









  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await getAuthors();
        setAuthors(response.data.data);
        // console.log(authors)
      } catch (error) {
        setError(error.message || 'Error fetching authors');
      }
      setLoading(false);
    };
    fetchAuthors();
  }, []);


  useEffect(() => {
    setLoading(true);
    authors.forEach(auth => {
      setAuthorname((pre)=> ({...pre , [auth._id]:`${auth.firstName}  ${auth.lastName}`}))
    });
    setLoading(false);
    // console.log(JSON.stringify(authorname, null, 2))
  }, [authors]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        setLoading(true);
        const response = await getCategories();
        setCategories(response.data.data);
      } catch (error) {
        setError(error.message || 'Error fetching Categories');
      }
      setLoading(false);
    };
    fetchCat();
  }, []);


  useEffect(() => {
    setLoading(true);
    categories.forEach(auth => {
      setCategoryname((pre)=> ({...pre , [auth._id]:auth.name}))
    });
    setLoading(false);
  }, [categories]);




  const getauthValue = (key) => {
    // console.log(authorname[key])
    return authorname[key] || key;
  };
  const getcatValue = (key) => {
    return categoryname[key] || key ;
  };









  return (
    <>
    {loading ? (
      <Spinner /> ) : (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"

          >
            <div className="w-full h-100 overflow-hidden">
            <Link to={`/books/details/${book._id}`}>
              <img
                src={book.image || placeholderImage} // Use placeholder image if no book image
                alt={book.title}
                className="w-full h-full object-fit"
              />
              </Link>
            </div>
            <div className="p-4 flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600 mt-1">Author: {getauthValue(book.AuthorId)}</p>
              <p className="text-gray-600 mt-1">Category: {getcatValue(book.Category)}</p>
            </div>
          </div>
          
        ))
      ) : (
        <p className="text-gray-600">No books available</p>
      )}
    </div>
    )};
    </>
  );
}

export default HomeBook;
