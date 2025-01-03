import React, { useState } from "react";

function LoginForm(props){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        const LoginFormData = {
            "username": username,
            "password": password,
            "email": email
        }

        const fetchSpecifications = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(LoginForm)
        }

        fetch("http://localhost:8080/login", fetchSpecifications
            //FINISH UP HERE!!!
        ).then(function (response) {
            if (!response.ok) {
                throw new Error("Could not log in");
            }
            return response.json();
        })  

        //FILLER
        alert("Login submitted")

        setUsername("");
        setEmail("");
        setPassword("");

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
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm