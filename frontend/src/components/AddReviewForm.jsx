// AddReviewForm.js
import React, { useState ,useEffect} from 'react';
import { getCuser,getCuserd} from '../services/api'; // Import your API function


const AddReviewForm = ({ onAddReview }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [userData, setUserData] = useState({}); 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment) {
      const parsedRating = parseFloat(rating);
      if (parsedRating <= 5) {
        onAddReview({ "rate": parsedRating, "comment": comment ,"uId" : userData._id,"name":userData.username});
        setRating('');
        setComment('');
      } else {
        alert("Rating cannot exceed 5.");
      }
    }
  };

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    // Ensure rating does not exceed 5
    if (value <= 5) {
      setRating(e.target.value);
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
        setUserData(response.data)

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchuser();
  }, []);



  return (
    <form onSubmit={handleSubmit} className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add a Review</h3>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Rating (0-5):</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          onChange={handleRatingChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
