import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserBar (props){

    const [loggedInUser, setUser] = useState(null);
    const [username, setUsername] = useState("Get Username");

    function getUserInfo(e){

        e.preventDefault();

         const fetchSpecifications = {
             method: "GET",
             credentials: "include",
             }

         fetch("http://localhost:8080/authenticationservice/userinfo", fetchSpecifications)
         .then(function (response){
            if (!response.ok) {
                throw new Error("No current user");
              }
             alert("A user exists");
             //const data = response.text();
             //alert("Why?");
             return response.json();
             })
            .then(function (receivedUserInfo){
                const userInfo = receivedUserInfo;
                setUser(userInfo);
                const current_username = userInfo.username;
                setUsername(current_username);
                alert("User Name is "+current_username);
                });
         }


    return(

         <button onClick={getUserInfo}>
                  {username}
             </button>
    )
}

export default UserBar
