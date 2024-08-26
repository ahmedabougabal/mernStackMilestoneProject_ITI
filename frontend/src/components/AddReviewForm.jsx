// AddReviewForm.js
import { useState } from 'react';
import PropTypes from 'prop-types';

const AddReviewForm = ({ onAddReview }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && comment) {
      const parsedRating = parseFloat(rating);
      if (parsedRating <= 5) {
        onAddReview({ "rate": parsedRating, "comment": comment , "name":"Anonymous"});
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

AddReviewForm.propTypes = {
  onAddReview: PropTypes.func.isRequired,
};

export default AddReviewForm; 