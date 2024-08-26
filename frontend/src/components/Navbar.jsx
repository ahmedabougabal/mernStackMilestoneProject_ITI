import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Goodreads Clone</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/Shelf" className="hover:text-gray-400">Shelf</Link>
          <Link to="/books" className="hover:text-gray-400">Books</Link>
          <Link to="/authors" className="hover:text-gray-400">Authors</Link>
          <Link to="/categories" className="hover:text-gray-400">Categories</Link>
          
          {/* User pages */}
          <Link to="/USauthorList" className="hover:text-gray-400">Authors</Link>
          <Link to="/UScategoryList" className="hover:text-gray-400">Categories</Link>

          {/* Authentication links */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Signup</Link>
            </>
          ) : (
            <Link to={userRole === 'admin' ? '/admin-profile' : '/user-profile'} className="hover:text-gray-400">
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;