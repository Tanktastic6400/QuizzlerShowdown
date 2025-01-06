import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import LogoutButton from "../components/LogoutButton";
import UserBar from "../components/UserBar";

function LoginPage () {

    return (
        <div>
            <UserBar/>
            <h1>Login</h1>
            <LoginForm/>
            {/*<LogoutButton/>*/}
        </div>
    );
}

export default LoginPage;