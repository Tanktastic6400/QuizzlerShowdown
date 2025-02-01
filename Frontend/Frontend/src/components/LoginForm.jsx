import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function LoginForm({ getUserInfo }) {
  const [loginMethod, setLoginMethod] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

 async function handleSubmit(e) {
    e.preventDefault();
    const LoginFormData = {
      username: loginMethod,
      password: password,
    };

    const response = await fetch("http://localhost:8080/authenticationservice/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(LoginFormData),
    });

    if (response.ok) {
      await getUserInfo(); 
      navigate("/", { replace: true });
    setTimeout(() => window.location.reload(), 500);
      
    } else {
      setError("Could not log in"); 
      setLoginMethod("");
      setPassword("");
    }
    return response;
}
  //   const fetchSpecifications = {
  //     method: "POST",
  //     credentials: "include", //Needed for cookies
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(LoginFormData),
  //   };

  //    fetch(
  //     "http://localhost:8080/authenticationservice/login",
  //     fetchSpecifications
  //   ).then(function (response) {
  //     if (!response.ok) {
  //       setLoginMethod("");
  //       setPassword("");
  //       throw new Error("Could not log in");
  //     }
  //    getUserInfo();
  //     setLoginMethod("");
  //     setPassword("");
  //     navigate("/");
  //     return response;
  //   });
  // }

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={loginMethod}
        onChange={function (e) {
          setLoginMethod(e.target.value);
        }}
        placeholder="Account Name or email"
        required
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
