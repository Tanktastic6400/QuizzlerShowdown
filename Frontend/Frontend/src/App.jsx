
import { useState, useEffect } from 'react'
//import './App.css'
import './styles/App.css'
import QuizDisplay from './components/QuizDisplay'
import QuizSelector from './components/QuizSelector'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage'
import ReviewPage from './pages/ReviewPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage';
import Chatbox from './components/Chatbox';
import FriendList from './components/FriendList';
import UserBar from './components/UserBar';
import ScorePage from './pages/ScorePage';


function App() {
  const [loggedInUser, setUser] = useState(null);
  const [username, setUsername] = useState("Get Username");

  function getUserInfo() {
    const fetchSpecifications = {
      method: "GET",
      credentials: "include",
    };

    fetch(
      "http://localhost:8080/authenticationservice/userinfo",
      fetchSpecifications
    )
      .then(function (response) {
        if (!response.ok) {
          setUser(null);
          throw new Error("No current user");
        }
        return response.json();
      })
      .then(function (receivedUserInfo) {
        const userInfo = receivedUserInfo;
        setUser(userInfo);
        const current_username = userInfo.username;
        setUsername(current_username);
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>

    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage getUserInfo={getUserInfo} />} />
      <Route path="/quizdisplay" element={<QuizDisplay/>} />
      <Route path="/quizselector" element={<QuizSelector/>} />
      <Route path="/scores" element={<ScorePage />} />
    </Routes>
    <UserBar loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>
    {/*}<Chatbox />
    <FriendList />
    <QuizSelector/>
    <QuizDisplay/>
    </BrowserRouter>*/}

    </>
  );
}

export default App;
