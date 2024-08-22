import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

import HomePage from './pages/HomePage';
import HomeBook from './components/HomeBook';
import AuthorList from './components/AuthorList';
import AuthorDetails from './components/AuthorDetails';
import CategoryList from './components/CategoryList';
import CategoryDetails from './components/CategoryDetails';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails.jsx';
import Navbar from './components/Navbar'; 
import './index.css';
import 'tailwindcss/tailwind.css';


///////////----------------------------

function App() {  

  
  return (
    <div>
      <Navbar /> 
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomeBook />} /> 
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/books" element={<BookList />} />
          <Route path='/books/details/:id' element={<BookDetails />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:id" element={<CategoryDetails />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
