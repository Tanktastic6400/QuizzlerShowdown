import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import Chatbox from './components/Chatbox';
import FriendList from './components/FriendList';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    <Chatbox />
    <FriendList />
  </BrowserRouter>
  )
}

export default App
