import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../CSS/LoginForm.css";

function LoginForm({ getUserInfo }) {
  const [loginMethod, setLoginMethod] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedLoginMethod = loginMethod.trim();

    const LoginFormData = {
      username: trimmedLoginMethod,
      password: password,
    };

    const fetchSpecifications = {
      method: "POST",
      credentials: "include", //Needed for cookies
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(LoginFormData),
    };

    fetch(
      "http://localhost:8080/authenticationservice/login",
      fetchSpecifications
    ).then(function (response) {
      if (!response.ok) {
        setLoginMethod("");
        setPassword("");
        alert("Your user information or password were incorrect.");
        throw new Error("Could not log in");
      }
      getUserInfo();
      setLoginMethod("");
      setPassword("");
      navigate("/quizselector");
      return response;
    });
  }

  return (
    <>
      <div className="loginFields">
        <form onSubmit={handleSubmit}>
          <input
            className="username"
            type="text"
            value={loginMethod}
            onChange={function (e) {
              setLoginMethod(e.target.value);
            }}
            placeholder="Account Name or email"
            required
          />
          <input
            className="password"
            type="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <Button variant="primary" type="submit">Login</Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
