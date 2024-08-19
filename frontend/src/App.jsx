import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthorList from './components/AuthorList';
import CategoryList from './components/CategoryList';
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
