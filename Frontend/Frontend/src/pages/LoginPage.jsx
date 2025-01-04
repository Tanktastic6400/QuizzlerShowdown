import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";


function LoginPage () {

    return (
        <div>
            <h1>Login</h1>
            <LoginForm/>
            <LogoutButton/>
        </div>
    );
}

export default LoginPage;