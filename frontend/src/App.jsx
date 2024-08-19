import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import BookDetails from './components/BookDetails';
import AuthorDetails from './components/AuthorDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/author/:id" element={<AuthorDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
