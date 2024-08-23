// ReviewsList.js
import React from 'react';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Reviews</h3>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-gray-600">{review.name || "Anonymous"}</h2>
              <div className="flex items-center justify-between mb-2">
              {/* <StarRating rating={review.rate} /> */}
                <span className="text-lg font-semibold text-gray-700">Rating: {review.rate} ★</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
