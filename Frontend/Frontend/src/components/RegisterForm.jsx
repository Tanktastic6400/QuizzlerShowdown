import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function RegisterForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const testUsername = username.trim();
    const testPassword = password;
    const testConfirmedPassword = confirmedPassword;

    if(testUsername.includes("@")){
        alert("Username may not contain @")
        setUsername("");
        throw new Error("Username may not contain @");
    }

    if(testConfirmedPassword != password){
        alert("Passwords do not match");
        setPassword("");
        setConfirmedPassword("");
        throw new Error ("Passwords do not match");
    }

    const registerFormData = {
      username: testUsername,
      password: password,
      email: email,
      passwordVerification: confirmedPassword,
    };

    const fetchSpecifications = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerFormData),
    };

    fetch(
      "http://localhost:8080/authenticationservice/register",
      fetchSpecifications

    ).then(function (response) {
      return response.text()}
    ).then(function (data){
        console.log(data);
        if(data==="Username already in use"){
                    setUsername("");
                    alert(data);
                    throw new Error(data);
            }
        else if (data==="Email already in use"){
            setEmail("");
            alert(data);
            throw new Error(data);
            }
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmedPassword("");
        if (data==="Successfully registered"){
            alert(data);
            navigate("/");
        }
        else{
            alert(data)
            throw new Error(data);
            }
        });
  }

  return (
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
      />
      <input
        type="password"
        value={confirmedPassword}
        onChange={function (e) {
          setConfirmedPassword(e.target.value);
        }}
        placeholder="Confirm Password"
      />
      <Button variant="primary" type="submit">Register</Button>
    </form>
  );
}

export default RegisterForm;
