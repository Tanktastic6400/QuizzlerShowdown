import React, { useState } from "react";

function RegisterForm(props){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

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

        fetch("http://localhost:8080/register", fetchSpecifications

            //FINISH UP HERE!!!
        ).then(function (response) {

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }
            return response.json();
        })  
    

        //FIGURE OUT PAST HERE, AND WHAT A RESPONSE ENTITY IS

        //FILLER
        alert("Form submitted")

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmedPassword("");

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