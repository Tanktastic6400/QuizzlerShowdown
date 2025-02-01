import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
// import UserSearch from "../components/UserSearch";
import QuizlerCowboy from "../images/QuizzlerCowboy.jpg";
import LogReg from "../components/LogReg";

// const MainPage = ({ loggedInUser }) => {
//   const navigate = useNavigate();
//   const handleReviewButtonClick = () => {
//     navigate("/reviews");
//   };

const MainPage = () => {
  return (
    <>
     <div className="main-content">
     <div className="left-side">
        <LogReg />
      </div>
     <div className="right-side">
      <div className="main-page-container">
        <h1 className="welcome-message">Welcome to Quizzler Showdown</h1>
      </div>
      <img src={QuizlerCowboy} alt="Quizler Cowboy" className="main-image"/>
    </div>
    </div>
    </>
  );
};

export default MainPage;
