import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Auth Components  
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Admin Components
import AdminRoute from './pages/Admin/AdminRoute';
import UserList from './pages/Admin/UserList';
import CategoryList from './pages/Admin/CategoryList';
import ProductList from './pages/Admin/ProductList';
import AllProducts from './pages/Admin/AllProducts';
import ProductUpdate from './pages/Admin/ProductUpdate';
import AdminDashboard from './pages/Admin/AdminDashboard';

// User Components
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/User/Profile';
import Home from './pages/Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';
import OrderList from './pages/Admin/OrderList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <BrowserRouter>
        <RouterProvider router={router} />
      </BrowserRouter>
    </PayPalScriptProvider>
  </Provider>
);
