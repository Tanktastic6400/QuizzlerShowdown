import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogoutButton({ getUserInfo }) {
  const navigate = useNavigate();

  function logout(e) {
    e.preventDefault();

    const fetchSpecifications = {
      method: "POST",
      credentials: "include", // Needed for cookies
    };
    fetch(
      "http://localhost:8080/authenticationservice/logout",
      fetchSpecifications
    ).then(function (response) {
      if (!response.ok) {
        throw new Error("Could not log out");
      }
      alert("Successfully logged out");
      getUserInfo();
      navigate("/");
      return response;
    });
  }

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
