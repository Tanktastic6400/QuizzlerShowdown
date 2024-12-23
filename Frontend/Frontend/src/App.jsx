import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import './App.css'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
