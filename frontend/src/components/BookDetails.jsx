import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import Spinner from '../components/Spinner';
import { updateBook ,getCuser,getCuserd} from '../services/api';
import StarRating from './StarRating';
import ReviewsList from './ReviewsList';  
import AddReviewForm from './AddReviewForm';  

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
  const [category, setCategory] = useState({});
  const [reviews, setReviews] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [edescription, setEdescription] = useState(false);
  const [rating, setRating] = useState(0);
  const [newreview, setNewreview] = useState(false); 
  const { id } = useParams();
  const [userData, setUserData] = useState({}); 
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5200/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setDescription(response.data.description);
        setRating(response.data.rating);
        setReviews(response.data.reviews)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [edescription, id,newreview]);

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
      await updateBook(book._id, jsondes);
      setEdescription(false);
    } catch (error) {
      console.log(error);
      setEdescription(false);
    }
  };

  const handleAddReview = async (review) => {
    try {
      const response = await axios.put(`http://localhost:5200/books/reviews/${id}`,review);
      setReviews([...reviews, response.data]);
      setNewreview((state)=> !state)
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
    const fetchuser = async () => {
      try {
        const tokenn = localStorage.getItem('token');
        const response0 = await getCuser({"token": tokenn});
        // console.log(response.data.userId);
        const response = await getCuserd(response0.data.userId);
        console.log(response.data.isAdmin);
        setIsAdmin(response.data.isAdmin)

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchuser();
  }, []);

  return (
    <div className="font-sans bg-gray-50">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <BackButton />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 shadow-lg p-8 bg-white rounded-lg">
          <div className="lg:col-span-2">
            {loading ? (
              <Spinner />
            ) : (
              <div className="text-center">
                <img
                  src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'}
                  alt={book.title}
                  className="w-64 h-96 object-cover mx-auto rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-4xl font-bold text-gray-900">{book.title}</h2>
            <StarRating rating={rating} />

            <div className="mt-6">
              <p className="text-xl text-gray-600">
                <span className="font-semibold">Book ID:</span> {book._id}
              </p>
              <p className="text-xl text-gray-600 mt-2">
                <span className="font-semibold">Author:</span>{' '}
                <Link to={`/authors/${author._id}`} className="text-blue-600 hover:underline">
                  {`${author.firstName} ${author.lastName}`}
                </Link>
              </p>
              <p className="text-xl text-gray-600 mt-2">
                <span className="font-semibold">Category:</span>{' '}
                <Link to={`/categories/${category._id}`} className="text-blue-600 hover:underline">
                  {category.name}
                </Link>
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-700">Description</h3>
              {edescription ? (
                <div className="mt-4">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleUpdateDescription}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-lg text-gray-700">{description}</p>
                  {isAdmin?(
                  <button
                    onClick={() => setEdescription(true)}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit Description
                  </button>
) :(<></>)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
          <ReviewsList reviews={reviews} />
          <AddReviewForm onAddReview={handleAddReview} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
