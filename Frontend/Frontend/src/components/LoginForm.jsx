import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm(props){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        const LoginFormData = {
            "username": username,
            "password": password,
            "email": email
        }

        const fetchSpecifications = {
            method: "POST",
            credentials: "include", //Needed for cookies
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(LoginFormData),
        }

        //"http://localhost:8080/login"
        //"http://localhost:8080/authenticationservice/login"
        fetch("http://localhost:8080/login", fetchSpecifications
            //FINISH UP HERE!!!
        ).then(function (response) {
            if (!response.ok) {
                setUsername("");
                setEmail("");
                setPassword("");
                throw new Error("Could not log in");
            }
            alert("Succesfully logged in.")
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/");
            return response
        })


    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={username}
            onChange={function(e) { setUsername(e.target.value); }}
            placeholder ="Account Name"
            />
             <input
            type="email"
            value={email}
            onChange={function(e) { setEmail(e.target.value); }}
            placeholder ="Email"
            />
            <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value); }}
            placeholder ="Password"
            required //Added for obvious reasons
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm