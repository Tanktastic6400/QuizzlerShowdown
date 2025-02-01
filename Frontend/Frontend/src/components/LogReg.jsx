import React from "react";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
// import RegisterForm from "./RegisterForm";
import "../CSS/logreg.css";

const LogReg = () => {
  return (
    <div className="logreg-page-container">
      <div className="welcome-container">
        <h5>Howdy, Partner! Welcome to Quizzler Showdown – the wildest quiz challenge in the West! Saddle up and test your knowledge across a variety of categories. Face off against friends, rise to the top of the leaderboard, and claim the title of Ultimate Quiz Gunslinger. Ready for a showdown? Let’s get this rodeo started!</h5>
      </div>
      <div className="logreg-container">
        <div className="login-container">
          <p>LOGIN TO START GAME:</p>
          <LoginForm />
        </div>
        <div className="register-container">
          <p>If you're not registered yet, just click <Link to="/register">here</Link> to register.</p>
        </div>
      </div>
    </div>
  );
};

export default LogReg;
