
import { useState, useEffect } from 'react'
import './App.css'
import QuizDisplay from './components/QuizDisplay'
import QuizSelector from './components/QuizSelector'

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
import UserBar from './components/UserBar';


function App() {

    const [loggedInUser, setUser] = useState(null);
    const [username, setUsername] = useState("Get Username");

        function getUserInfo(){

            //e.preventDefault();

             const fetchSpecifications = {
                 method: "GET",
                 credentials: "include",
                 }

             fetch("http://localhost:8080/authenticationservice/userinfo", fetchSpecifications)
             .then(function (response){
                if (!response.ok) {
                    throw new Error("No current user");
                    setUser(null);
                  }
                 //alert("A user exists");
                 return response.json();
                 })
                .then(function (receivedUserInfo){
                    const userInfo = receivedUserInfo;
                    setUser(userInfo);
                    const current_username = userInfo.username;
                    setUsername(current_username);
                    //alert("User Name is "+current_username);
                    });
             }

   useEffect(() => {
      getUserInfo(); //
    }, []);
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/reviews" element={<ReviewPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage getUserInfo={getUserInfo} />} />
    </Routes>
    <UserBar loggedInUser={loggedInUser}/>
    {/*}<Chatbox />
    <FriendList />
    <QuizSelector/>
    <QuizDisplay/>*/}
  </BrowserRouter>

  )
}

export default App
