import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import LogoutButton from "../components/LogoutButton";

function UserBar ( {loggedInUser, getUserInfo} ){



    return(
        <>
        <Navbar bg="warning" data-bs-theme="light" fixed="top">
        <Container>
        <nav className="menu">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/reviews">Reviews</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        </nav>
        {loggedInUser ? (
                     <div>
                        {loggedInUser.username}
                        <LogoutButton getUserInfo = {getUserInfo}/>
                     </div>
                 ) : (
                     <Nav.Link href="/login">Login</Nav.Link>
                 )}
        </Container>
        </Navbar>
        </>
    )
}

export default UserBar
