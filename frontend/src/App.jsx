import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import HomePage from './pages/HomePage';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';
import BookList from './components/BookList';
import Navbar from './components/Navbar'; // Import the Navbar
import './index.css'
import 'tailwindcss/tailwind.css';

function App() {  

  

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
