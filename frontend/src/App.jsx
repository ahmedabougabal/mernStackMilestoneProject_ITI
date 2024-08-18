import { useEffect } from 'react';
import './app.css';
import axios from 'axios';
// import { response } from 'express';


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
