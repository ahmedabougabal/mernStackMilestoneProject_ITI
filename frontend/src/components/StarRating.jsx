import React, { useState } from 'react';

const StarRating = ({ maxRating = 5, rating = 0, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleMouseEnter = (index) => setHoverRating(index);
  const handleMouseLeave = () => setHoverRating(0);
  const handleClick = (index) => {
    setCurrentRating(index);
    if (onRatingChange) onRatingChange(index);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span
          key={i}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: i <= (hoverRating || currentRating) ? 'gold' : 'gray',
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
