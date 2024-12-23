import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import Chatbox from './components/Chatbox';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
    </Routes>
    <Chatbox />
  </BrowserRouter>
  )
}

export default App
