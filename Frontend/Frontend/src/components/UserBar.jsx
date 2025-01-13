import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoutButton from "../components/LogoutButton";
import DeleteButton from "../components/DeleteButton";

function UserBar ( {loggedInUser, getUserInfo} ){



    return(

         <div>
             <nav className="menu">
               <ul>
                 <li><a href="/">Home</a></li>
                 <li><a href="/reviews">Reviews</a></li>
                 <li><a href="/register">Register</a></li>
                 {loggedInUser ? (
                     <div>
                        <li>{loggedInUser.username}</li>
                        <li><LogoutButton getUserInfo = {getUserInfo}/></li>
                        <li><DeleteButton getUserInfo = {getUserInfo}/></li>
                     </div>
                 ) : (
                     <li><a href="/login">Login</a></li>
                 )}
               </ul>
             </nav>
         </div>
    )
}

export default UserBar
