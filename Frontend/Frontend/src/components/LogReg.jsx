import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../CSS/logreg.css";

const LogReg = () => {
  return (
    <div className="logreg-container">
      <div className="login-container">
        <LoginForm />
      </div>
      <div className="register-container">
        <RegisterForm />
      </div>
    </div>
  );
};

export default LogReg;
