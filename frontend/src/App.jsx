import { useEffect } from 'react';
import axios from 'axios';
import { Routes , Route} from 'react-router';
import Home from './pages/Home'



function App() {

  useEffect(()=>{
    axios.get('http://localhost:5200/books').then(
      response => console.log(response)
    )
  },[])

  return (
    <Routes>
      <Route path='/' element={<Home />} />

    </Routes>
  )
}

export default App
