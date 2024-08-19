import { useEffect , useState } from 'react';
import axios from 'axios';
// import { response } from 'express';
// import Home from './pages/Home'


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
    <div className='app bg-red-400'>
      <h1>testing the program</h1>
      {/* <div>    
      {books.length > 0 ? (
          books.map((item) => (
            <div key={item.id}>{item.name}</div> 
          ))
        ):null}
      </div> */}

    </div>
  )
}

export default App