import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../CSS/logreg.css";

const LogReg = ({ getUserInfo }) => {
  return (
    <>
      <div className="centerMass">
        <div className="largeColmn">
          <div className="logincontainer">
            <p className="logintext">
              Howdy partner, welcome to Quizzler Showdown - the wildest quiz challenge in the west!
              Saddle up and test your knowledge across a variety of categories.
              Face off against friends, rise to the top of the leaderboard, and claim the title of Ultimate Quiz Gunslinger
              Ready for a showdown? Let's get this rodeo started!
            </p>

            <div className="login-container">
              <LoginForm getUserInfo={getUserInfo} />
            </div>
          </div>
        </div>
        <div className="loginPicture">
          <img className="loginPicture" src="./src/images/QuizzlerCowboy.jpg"></img>
        </div>
      </div>

    </>

  );
};

export default LogReg;
