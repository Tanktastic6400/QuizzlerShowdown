import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogoutButton(props){

    const logoutA = async () => {
        try {
          const response = await fetch("http://localhost:8080/userservice/logout", {
            method: "POST",
            credentials: "include", // Ensures session cookies are sent
          });
          if (response.ok) {
            refreshUser(); // Refresh user state
            navigate("/login"); // Redirect to login page
          } else {
            console.error("Failed to log out");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

  const navigate = useNavigate();

  function logout(e){

       e.preventDefault();

       const fetchSpecifications = {
           method: "POST",
           credentials: "include", // Needed for cookies
           }
       fetch("http://localhost:8080/logout", fetchSpecifications)
       .then(function (response){
           if (!response.ok) {
               throw new Error("Could not log out");
           }
           alert("Successfully logged out");
           navigate("/");
           return response;
       })
   }

  return(
      <button onClick={logout}>
          Logout
     </button>
     );
 }

export default LogoutButton