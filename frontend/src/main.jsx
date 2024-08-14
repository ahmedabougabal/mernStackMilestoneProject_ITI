import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactDOM } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import router from './routers/router.jsx'  
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
      </StrictMode>,
)
