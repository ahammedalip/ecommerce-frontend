import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminRoutes from './routes/adminRoutes';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

import UserProducts from './pages/UserProducts';
// import UserRoutes from './routes/UserRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="min-h-screen pt-[px]  justify-center bg-red-100/15"
      >
       
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path='/' element={<Home/>} />
          <Route path='/userProducts' element={<UserProducts/>}/>
     
        </Routes>
      </div>
    </BrowserRouter>
  );
}
