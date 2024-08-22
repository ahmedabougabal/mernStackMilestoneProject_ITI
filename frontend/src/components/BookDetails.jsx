import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import Spinner from '../components/Spinner';
import {updateBook} from '../services/api';


const BookDetails = () => {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [description,setDescription] = useState("")
  const [edescription,setEdescription] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5200/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        setDescription(book.description)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [edescription]);

  useEffect(() => {
    if(book._id){
    setLoading(true);
    axios.get(`http://localhost:5200/authors/${book.AuthorId}`)
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }, [book]);

  useEffect(() => {
    if(book._id){
    setLoading(true);
    axios.get(`http://localhost:5200/categories/${book.Category}`)
      .then((response) => {
        setCategory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }, [book]);





  const handleUpdateDescription = async ()=>{
    try{
      const jsondes = {"description": description}
      const response = await updateBook(book._id,jsondes);
      setEdescription(false);
      }catch (error) {
       console.log(error)
       setError(error.response.data.message || 'Error updating Description');
       setEdescription(false);
     }
  }




  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex border-2 border-sky-100 rounded-xl w-cover h-[40vh] p-4'>
          {book.image && <img src={book.image || placeholderImage} alt={book.title} className="w-100 h-200 object-cover" />}
          <div>
            <div className='my-4'>
              <span className='text-2xl mr-4 text-gray-500'>Id</span>
              <span>{book._id}</span>
            </div>
            <div className='my-4'>
              <span className='text-2xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>
            <div className='my-4'>
            <Link to={`/authors/${author._id}`} className="text-blue-500 hover:underline">
              <span className='text-2xl mr-4 text-gray-500'>Author</span>
              <span>{`${author.firstName} ${author.lastName}`}</span>
              </Link>
            </div>
            <div className='my-4'>
            <Link to={`/categories/${category._id}`} className="text-blue-500 hover:underline">
              <span className='text-2xl mr-4 text-gray-500'>Category</span>
              <span>{category.name}</span>
              </Link>
            </div>
            <div className='my-4'>
            <span className='text-2xl mr-4 text-gray-500'>Description</span>
              {edescription? (<>
                    <button onClick={handleUpdateDescription} className="text-green-500 hover:text-green-700 mr-2">✅</button>
                    <br />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value) } className="border p-2">
                      </textarea>               
                     </>
                   ) : ( <>
                    <button onClick={() => (setEdescription(true))} className="text-blue-500 hover:text-blue-700 mr-2">✏️</button>
                    <br />
                    <p>{book.description}</p>
                    </>
                   ) } 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;




























// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Spinner from './Spinner.jsx';
// import { getBookById } from '../services/api'; // Import your API function

// const BookDetails = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         const response = await getBookById(id); // Use your API function
//         setBook(response.data);
//       } catch (error) {
//         setError(error.message || 'Error fetching book details');
//       }
//     };
//     fetchBookDetails();
//   }, [id]);

//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (!book) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
//       <img src={book.image} alt={book.title} className="w-full h-auto mb-4" />
//       <p className="mb-4">{book.description}</p>
//       <p className="font-semibold">Author: {book.author.name}</p>
//       <p className="font-semibold">Category: {book.category.name}</p> {/* Ensure category name matches your API response */}
//     </div>
//   );
// };

// export default BookDetails;