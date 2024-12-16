import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import './App.css'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
