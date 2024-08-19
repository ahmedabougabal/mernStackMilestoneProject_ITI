// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar-1">
      <div className="navDev">
        <div className="nav-logo">
          <Link to="/">Goodreads Clone</Link>
        </div>
        <div className="nav-pags">
          <Link to="/" className="nav-home">Home</Link>
          <Link to="/authors" className="nav-authors">Authors</Link>
          <Link to="/categories" className="nav-Categories">Categories</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
