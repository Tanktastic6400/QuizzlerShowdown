import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginForm({ getUserInfo }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const LoginFormData = {
      username: username,
      password: password,
      email: email,
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
        setUsername("");
        setEmail("");
        setPassword("");
        throw new Error("Could not log in");
      }
      getUserInfo();
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
      return response;
    });
  }

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={function (e) {
          setUsername(e.target.value);
        }}
        placeholder="Account Name"
      />
      <input
        type="email"
        value={email}
        onChange={function (e) {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={function (e) {
          setPassword(e.target.value);
        }}
        placeholder="Password"
        required //Added for obvious reasons
      />
      <Button variant="primary" type="submit">Login</Button>
    </form>
    </>
  );
}

export default LoginForm;
