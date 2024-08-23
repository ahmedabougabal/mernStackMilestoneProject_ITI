import React from 'react';

const StarRating = ({ rating = 0, maxRating = 5 }) => {
  // Function to generate star elements
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          style={{
            fontSize: '24px',
            color: i <= rating ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
