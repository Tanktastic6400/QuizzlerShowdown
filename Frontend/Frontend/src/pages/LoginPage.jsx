import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";
import UserBar from "../components/UserBar";

function LoginPage ( {getUserInfo} ) {

    return (
        <div>
            <h1>Login</h1>
            <LoginForm getUserInfo ={getUserInfo}/>
        </div>
    );
}

export default LoginPage;