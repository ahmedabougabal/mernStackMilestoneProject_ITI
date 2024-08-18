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
    <>
      <Home/>
      <h1>Mahmoud ismail</h1>
    </>
  )
}

export default App
