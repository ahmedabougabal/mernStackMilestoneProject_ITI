import { Routes, Route, Outlet } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './index.css';
import 'tailwindcss/tailwind.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './components/Navbar'; 
import Navigation from "./pages/Auth/Navigation";

import HomePage from './pages/HomePage';
import HomeBook from './components/HomeBook';
import Shelf from './components/Shelf';
import AuthorList from './components/AuthorList';
import AuthorDetails from './components/AuthorDetails';
import CategoryList from './components/CategoryList';
import CategoryDetails from './components/CategoryDetails';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails.jsx';
import Footer from './components/Footer'; 

import USauthorList from './components/USauthorList';
import UScategoryList from './components/UScategoryList';

function App() {  
  return (
    <div>
      <ToastContainer />
      <Navbar /> 
      <Navigation />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<HomeBook />} />
          <Route path="/Shelf" element={<Shelf />} /> 
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/books" element={<BookList />} />
          <Route path='/books/details/:id' element={<BookDetails />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />

          {/* users pages */}
          <Route path="/USauthorList" element={<USauthorList />} />
          <Route path="/UScategoryList" element={<UScategoryList />} />

          {/* Outlet to render nested routes */}
          <Route path="/*" element={<Outlet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
