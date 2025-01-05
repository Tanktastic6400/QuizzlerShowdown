import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm(props){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        const registerFormData = {
            "username": username,
            "password": password,
            "email": email,
            "passwordVerification": confirmedPassword
        }

        const fetchSpecifications = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(registerFormData)
        }

        //"http://localhost:8080/register"
        //"http://localhost:8080/authenticationservice/register"
        fetch("http://localhost:8080/authenticationservice/register", fetchSpecifications

            //FINISH UP HERE!!!
        ).then(function (response) {
            if (!response.ok) {
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmedPassword("");
                throw new Error("Could not submit registration information");
            }
            alert("Form submitted")
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmedPassword("");
            navigate("/login");
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
            />
             <input
            type="password"
            value={confirmedPassword}
            onChange={function(e) { setConfirmedPassword(e.target.value); }}
            placeholder ="Confirm Password"
            />
            <button type="submit">Register User</button>
        </form>
    );
}

export default RegisterForm