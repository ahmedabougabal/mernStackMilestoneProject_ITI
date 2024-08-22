import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import Spinner from '../components/Spinner';
import { updateBook } from '../services/api';
import StarRating from './StarRating'; 


const BookDetails = () => {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [edescription, setEdescription] = useState(false);
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5200/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
        setDescription(response.data.description);
        setRating(response.data.rating)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [edescription, id]);

  useEffect(() => {
    if (book._id) {
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
    if (book._id) {
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

  const handleUpdateDescription = async () => {
    try {
      const jsondes = { description: description };
      const response = await updateBook(book._id, jsondes);
      setEdescription(false);
    } catch (error) {
      console.log(error);
      setEdescription(false);
    }
  };

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <BackButton />
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                  <img
                    src={book.image || 'https://via.placeholder.com/150'}
                    alt={book.title}
                    className="w-3/4 rounded object-cover mx-auto"
                  />
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                  <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer">
                    <img src={book.image || 'https://via.placeholder.com/150'} alt={book.title} className="w-full" />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">{book.title}</h2>

            <div className="my-4">
              <span className="text-2xl mr-4 text-gray-500">Id:</span>
              <span>{book._id}</span>
            </div>
            <StarRating rating={rating} />
            <div className="my-4">
              <Link to={`/authors/${author._id}`} className="text-blue-500 hover:underline">
                <span className="text-2xl mr-4 text-gray-500">Author:</span>
                <span>{`${author.firstName} ${author.lastName}`}</span>
              </Link>
            </div>

            <div className="my-4">
              <Link to={`/categories/${category._id}`} className="text-blue-500 hover:underline">
                <span className="text-2xl mr-4 text-gray-500">Category:</span>
                <span>{category.name}</span>
              </Link>
            </div>

            <div className="my-4">
              <span className="text-2xl mr-4 text-gray-500">Description:</span>
              {edescription ? (
                <>
                  <button onClick={handleUpdateDescription} className="text-green-500 hover:text-green-700 mr-2">✅</button>
                  <br />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full mt-2"
                  />
                </>
              ) : (
                <>
                  <button onClick={() => setEdescription(true)} className="text-blue-500 hover:text-blue-700 mr-2">✏️</button>
                  <br />
                  <p className="mt-2">{book.description}</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-xl font-bold text-gray-800">Book Information</h3>
          <ul className="mt-4 space-y-6 text-gray-800">
            <li className="text-sm">Author <span className="ml-4 float-right">{`${author.firstName} ${author.lastName}`}</span></li>
            <li className="text-sm">Category <span className="ml-4 float-right">{category.name}</span></li>
            <li className="text-sm">Description <span className="ml-4 float-right">{book.description}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
