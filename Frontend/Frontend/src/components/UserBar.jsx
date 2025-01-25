import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutButton from "../components/LogoutButton";
import DeleteButton from "../components/DeleteButton";

function UserBar({ loggedInUser, getUserInfo }) {
  return (
    <Navbar bg="warning" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="../src/images/QuizzlerCowboy.jpg"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link> */}
          <Nav.Link as={Link} to="/quizselector">
            Create Quiz
          </Nav.Link>
        </Nav>
        <Nav>
          {loggedInUser ? (
            <div className="d-flex align-items-center">
              <Dropdown autoClose={false}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {loggedInUser.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as="div">
                    <LogoutButton getUserInfo={getUserInfo} />
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <DeleteButton getUserInfo={getUserInfo} />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default UserBar;
