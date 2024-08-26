import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './index.css';
import 'tailwindcss/tailwind.css';

import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 

import HomePage from './pages/HomePage';
import HomeBook from './components/HomeBook';
import Shelf from './components/Shelf';
import AuthorList from './components/AuthorList';
import AuthorDetails from './components/AuthorDetails';
import CategoryList from './components/CategoryList';
import CategoryDetails from './components/CategoryDetails';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails.jsx';

import USauthorList from './components/USauthorList';
import UScategoryList from './components/UScategoryList';

import Login from './components/Login';
import Signup from './components/Signup';
import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {  
  return (
    <div>
      <Navbar /> 
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Shelf" element={<Shelf />} /> 
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/:id" element={<AuthorDetails />} />
          <Route path="/books" element={<BookList />} />
          <Route path='/books/details/:id' element={<BookDetails />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:id" element={<CategoryDetails />} />

          {/* User pages */}
          <Route path="/" element={<HomeBook />} />
          <Route path="/USauthorList" element={<USauthorList />} />
          <Route path="/UScategoryList" element={<UScategoryList />} />

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route 
            path="/admin-profile" 
            element={
              <ProtectedRoute role="admin">
                <AdminProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-profile" 
            element={
              <ProtectedRoute role="user">
                <UserProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;