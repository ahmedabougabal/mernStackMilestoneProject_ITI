import Navbar from "./components/Navbar"
import {Outlet} from 'react-router-dom'
import './index.css';
import { useState } from "react";

function App() {
  const [count,setCount] = useState(0);
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
