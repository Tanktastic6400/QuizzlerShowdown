import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import UserSearch from "../components/UserSearch";

const MainPage = ({ loggedInUser }) => {
  const navigate = useNavigate();
  const handleReviewButtonClick = () => {
    navigate("/reviews");
  };
  return (
    <>
      <div className="main-page-container">
        <h1>Welcome to Quizzler Showdown</h1>
      </div>
    </>
  );
};

export default MainPage;
