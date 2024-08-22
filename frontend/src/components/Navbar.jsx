// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Goodreads Clone</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/Shelf" className="text-white hover:text-gray-400">Shelf</Link>
          <Link to="/books" className="text-white hover:text-gray-400">Books</Link>
          <Link to="/authors" className="text-white hover:text-gray-400">Authors</Link>
          <Link to="/categories" className="text-white hover:text-gray-400">Categories</Link>
          
          {/* user pages */}
          <Link to="/USauthorList" className="text-white hover:text-gray-400">Authors</Link>
          <Link to="/UScategoryList" className="text-white hover:text-gray-400">Categories</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
