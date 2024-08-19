import React from 'react';
import BookList from '../components/BookList';
import CategoryList from '../components/CategoryList';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Goodreads</h1>
      <BookList />
      <CategoryList />
    </div>
  );
};

export default HomePage;
