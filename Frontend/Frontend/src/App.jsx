
import { useState, useEffect } from "react";
import "./styles/App.css";
import QuizDisplay from "./components/QuizDisplay";
import QuizSelector from "./components/QuizSelector";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./pages/MainPage";
import ReviewPage from "./pages/ReviewPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Chatbox from "./components/Chatbox";
import UserBar from "./components/UserBar";
import ScorePage from "./pages/ScorePage";
import ChatContainer from "./components/ChatContainer";
import ProfilePage from "./pages/ProfilePage";
import LogReg from "./components/LogReg";
import AnswerDisplay from "./components/AnswerDisplay";
import Scoreboard from "./components/Scoreboard";
import ErrorPage from "./pages/ErrorPage";
import AllScoresPage from "./pages/AllScoresPage";


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
        <Route path="/" element={loggedInUser ? <MainPage loggedInUser={loggedInUser} getUserInfo={getUserInfo} /> : <LogReg getUserInfo={getUserInfo} />} />
        <Route path="/quizselector" element={loggedInUser ? <QuizSelector loggedInUser={loggedInUser} /> : <LogReg getUserInfo={getUserInfo} />} />
        {/* <Route path="/" element={<MainPage />} /> */}
        {/* <Route path="/" element={<MainPage loggedInUser={loggedInUser} />} /> */}
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage getUserInfo={getUserInfo} />} />
        <Route path="/quizdisplay" element={<QuizDisplay loggedInUser={loggedInUser} />} />
        {/* <Route path="/quizselector" element={<QuizSelector loggedInUser={loggedInUser} />} /> */}
        <Route path="/answerDisplay" element={<AnswerDisplay />} />
        <Route path="/all-scores" element={<AllScoresPage />} />
        <Route path="/answerDisplay" element={<AnswerDisplay />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/scores" element={<ScorePage loggedInUser={loggedInUser} getUserInfo={getUserInfo} />} />
        <Route path="/chat" element={<Chatbox loggedInUser={loggedInUser} getUserInfo={getUserInfo} />} />
        <Route path="profile/:username" element={<ProfilePage loggedInUser={loggedInUser} getUserInfo={getUserInfo} />} />
      </Routes>


      {/* {loggedInUser?(<MainPage loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>) : (<LogReg getUserInfo={getUserInfo}/> )} */}
      <Scoreboard loggedInUser={loggedInUser} />
      <UserBar loggedInUser={loggedInUser} getUserInfo={getUserInfo} />
      {loggedInUser ? (<ChatContainer loggedInUser={loggedInUser} getUserInfo={getUserInfo} />) : <div></div>}
    </>
  );
}

export default App;
