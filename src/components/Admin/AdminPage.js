'use client'
import React, { useState, useEffect } from 'react';
import App from './Apps/AppComponent'
import Vote from './Vote/VoteComponent'
import Project from './Project/ProjectComponent'
import Work from './Work/WorkComponent'
import Blogs from './Blogs/BlogComponent'
import 'dotenv/config';

const DashboardPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("authenticated");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === process.env.ADMIN_PASSWORD) { 
      setIsAuthenticated(true);
      sessionStorage.setItem("authenticated", "true");
    } else {
      alert('Invalid password'); 
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-6 bg-gray-800 text-white min-h-screen">
        <h1 className="text-3xl font-semibold text-center">Dashboard</h1>
        <p className="text-center mb-6">This is my admin dashboard!</p>
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-center">App Section</h2>
          <App />

          <h2 className="text-2xl font-semibold text-center pt-12">Vote Section</h2>
          <Vote />

          <h2 className="text-2xl font-semibold text-center pt-12">Project Section</h2>
          <Project />

          <h2 className="text-2xl font-semibold text-center pt-12">Work Section</h2>
          <Work />

          <h2 className="text-2xl font-semibold text-center pt-12">Blogs Section</h2>
          <Blogs />
        </div>
      </div>
    );
  }
else{
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter password"
          />
        </div>
        <button 
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </div>
  );
}
};

export default DashboardPage;
