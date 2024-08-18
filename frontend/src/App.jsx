import { useEffect } from 'react';
import axios from 'axios';
// import { response } from 'express';
// import Home from './pages/Home'


function App() {

  useEffect(()=>{
    axios.get('http://localhost:5200/books').then(
      response => console.log(response)
    )
  },[])

  return (
    <div className='app'>
      <h1>testing the program</h1>
    </div>
  )
}

export default App
