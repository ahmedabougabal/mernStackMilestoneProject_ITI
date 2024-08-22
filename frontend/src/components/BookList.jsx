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

// Placeholder image URL (replace with your own placeholder image)
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
          // console.log(authors)
        } catch (error) {
          setError(error.message || 'Error fetching authors');
        }
      };
      fetchAuthors();
    }, []);


    useEffect(() => {
      authors.forEach(auth => {
        setAuthorname((pre)=> ({...pre , [auth._id]:`${auth.firstName}  ${auth.lastName}`}))
      });
      // console.log(JSON.stringify(authorname, null, 2))
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
        setCategoryname((pre)=> ({...pre , [auth._id]:auth.name}))
      });
    }, [categories]);

    // function author_name(authid){
    //   authors.forEach(auth => {
    //     if(auth._id == authid){
    //       // console.log(auth.firstName + " " + auth.lastName)
    //       return auth.firstName + " " + auth.lastName;
    //     }
    //   });
    //   }


    const getauthValue = (key) => {
      // console.log(authorname[key])
      return authorname[key] || key;
    };
    const getcatValue = (key) => {
      return categoryname[key] || key ;
    };



  return (
    <>
    <div className='flex justify-between items-center'>
    <h1 className='text-3xl my-8'>Books List</h1>
      <MdOutlineAddBox onClick={() => {setShowModal(true);setShowType("add");setShowBk(("add"))}} className='text-sky-800 text-5xl' />
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
           {book.image && <img src={book.image} alt={book.title} className="w-1/4 h-1/3 object-cover" />}
          </td>
          <td className='border border-slate-700 rounded-md text-center'>
            {/* {book.name} */}
            {book.title}
          </td>

          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {/* {book.Category} */}
            {getcatValue(book.Category)}
          </td>

          <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
            {/* {author_name(book.AuthorId)} */}
            {/* {book.AuthorId} */}
            {getauthValue(book.AuthorId)}
          </td>

          <td className='border border-slate-700 rounded-md text-center'>
            <div className='flex justify-center gap-x-4'>
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className='text-2xl text-green-800' />
              </Link>
                <AiOutlineEdit onClick={() => {setShowModal(true);setShowType("update");setShowBk((book._id))}} className='text-2xl text-yellow-600' />
                <MdOutlineDelete onClick={()  => deleted(book._id)} className='text-2xl text-red-600' />
            </div>
            {showModal && ((showBk=="add" || showBk==book._id) &&
        (<AddAndUpdate book={book} onClose={() =>{ setShowModal(false);setChanged((state)=> !state)} } type={showType}/>)
      )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
        )}
  </>

  );
}

export default BookList;
