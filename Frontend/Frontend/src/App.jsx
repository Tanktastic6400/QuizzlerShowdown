
import { useState } from 'react'
import './styles/App.css'
import QuizDisplay from './components/QuizDisplay'
import QuizSelector from './components/QuizSelector'

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import Chatbox from './components/Chatbox';
import FriendList from './components/FriendList';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/quizdisplay" element={<QuizDisplay/>} />
      <Route path="/quizselector" element={<QuizSelector/>} />
    </Routes>
    <Chatbox />
    <FriendList />
    </>
  )
}

export default App
