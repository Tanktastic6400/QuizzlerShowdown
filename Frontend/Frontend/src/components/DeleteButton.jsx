import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DeleteButton( {getUserInfo} ){

    const navigate = useNavigate();

    function deleteAccount(e){

        e.preventDefault();

        const fetchSpecifications = {
                   method: "POST",
                   credentials: "include", // Needed for cookies
                   }
               fetch("http://localhost:8080/userservice/deleteAccount", fetchSpecifications)
               .then(function (response){
                   if (!response.ok) {
                       throw new Error("Could not delete account");
                   }
                   alert("Account deleted");
                   getUserInfo();
                   navigate("/");
                   window.location.reload(); //Reload so everything doesn't explode.
                   return response;
               });
       }

    return (
        <button onClick={deleteAccount}>
                  Delete Account
             </button>
        );

}


export default DeleteButton