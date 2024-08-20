import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookList from './components/BookList.jsx';
import AuthorList from './components/AuthorList.jsx';
import CategoryList from './components/CategoryList.jsx';
import Navbar from './components/Navbar'; // Import the Navbar


function App() {


  // const [books, setBook] = useState({});
  // useEffect(()=>{
  //   axios.get('http://localhost:5200/books').then(
  //     response => {
  //      console.log(response.data.data)
  //      setBook(response.data.data)
  //     }
  //   )
  // },[])


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
