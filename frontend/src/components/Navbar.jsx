import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCuser,getCuserd} from '../services/api'; // Import your API function


function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [olduserToken, setOldUserToken] = useState("");


  if(olduserToken != localStorage.getItem('token')){
    setOldUserToken(localStorage.getItem('token'))
  }

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };




  useEffect(() => {
    const fetchuser = async () => {
      try {
        const tokenn = localStorage.getItem('token');
        if(tokenn != null){
        const response0 = await getCuser({"token": tokenn});
        // console.log(response.data.userId);
        const response = await getCuserd(response0.data.userId);
        console.log(response.data.isAdmin);
        setIsAdmin(response.data.isAdmin)
        }else{
          setIsAdmin(false);
        }

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchuser();
  }, [olduserToken]);




  return (
    <nav className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Goodreads Clone</Link>
        </div>
        <div className="space-x-4">
          {isAdmin ? ( <>  
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/Shelf" className="hover:text-gray-400">Shelf</Link>
          <Link to="/books" className="hover:text-gray-400">Books</Link>
          <Link to="/authors" className="hover:text-gray-400">Authors</Link>
          <Link to="/categories" className="hover:text-gray-400">Categories</Link>
          </>
          ):( <>  
          {/* User pages */}
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/Shelf" className="hover:text-gray-400">Shelf</Link>
          <Link to="/USauthorList" className="hover:text-gray-400">Authors</Link>
          <Link to="/UScategoryList" className="hover:text-gray-400">Categories</Link>
          </>
          )}
          {/* Authentication links */}
          {!olduserToken ? (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Signup</Link>
            </>
          ) : (
            <>
              <Link to={"/profile"} className="hover:text-gray-400">
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;