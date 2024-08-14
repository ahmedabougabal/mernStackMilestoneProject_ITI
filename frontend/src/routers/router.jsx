import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/UploadBook";
import Dashboard from "../dashboard/Dashboard";
import SingleBook from "../components/SingleBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/shop",
        element: <Shop/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      {
        path: "/singlebook",
        element: <SingleBook/> 
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard", 
        element: <Dashboard />
      },
      {
        path: "/admin/dashboard/upload", 
        element: <UploadBook />
      }
    ]
  }
]);

export default router;
