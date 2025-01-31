import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../CSS/logreg.css";

const LogReg = () => {
  return (
    <div className="container-fluid" >
      <img src="./src/images/QuizzlerCowboy.jpg" className="img-fluid w-50" alt="background image" />
      <p>
      
      </p>
      
      <div className="login-container">
        <LoginForm />
      </div>
      
    </div>
  );
};

export default LogReg;
