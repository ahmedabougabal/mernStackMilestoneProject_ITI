import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Label, TextInput, Alert } from 'flowbite-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role);
      if (response.data.role === 'admin') {
        navigate('/admin-profile');
      } else {
        navigate('/user-profile');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" 
         style={{backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="z-10 bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-2xl max-w-md w-full backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Login</h2>
        {error && <Alert color="failure" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-lg font-medium text-white">Email</Label>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-lg font-medium text-white">Password</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="mt-1 bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            />
          </div>
          <Button type="submit" className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700 transition-colors">
            Login
          </Button>
        </form>
        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;