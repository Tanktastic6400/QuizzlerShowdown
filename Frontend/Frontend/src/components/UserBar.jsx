import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoutButton from "../components/LogoutButton";

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

         <div>
             <nav className="menu">
               <ul>
                 <li><a href="/">Home</a></li>
                 <li><a href="/reviews">Reviews</a></li>
                 <li><a href="/register">Register</a></li>
                 {loggedInUser ? (
                     <div>
                        <li>{username}</li>
                        <li><LogoutButton/></li>
                     </div>
                 ) : (
                     <li><a href="/login">Login</a></li>
                 )}
               </ul>
             </nav>
            <button onClick={getUserInfo}>
                {username}
             </button>
         </div>
    )
}

export default UserBar
