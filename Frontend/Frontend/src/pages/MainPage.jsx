import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

import QuizSelector from "../components/QuizSelector";
import Scoreboard from "../components/Scoreboard";
import LogReg from "../components/LogReg";
import UserBar from "../components/UserBar";
import ChatContainer from "../components/ChatContainer";

const MainPage = ({ loggedInUser, getUserInfo}) => {
  const navigate = useNavigate();
  const handleReviewButtonClick = () => {
    navigate("/reviews");
  };
  return (
    <>
      <div className="main-page-container">
        <Scoreboard loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>
        
      </div>
    </>
  );
};

export default MainPage;
