import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import LogoutButton from "../components/LogoutButton";
import DeleteButton from "../components/DeleteButton";
import UserSearch from "./UserSearch";
import { Button } from "react-bootstrap";
import Navbarpicture from "../images/Navbarpicture.jpg"

function UserBar({ loggedInUser, getUserInfo }) {
  const navigate = useNavigate();
  const handleReviewButtonClick = () => {
    navigate('/reviews');
  }

  return (
    <>
    <div className="navbar-image-container">
        <img src={Navbarpicture} alt="Navbarepicture" className="navbar-image" />
      </div>
    <Navbar fixed="top" className="navbar">
      <Container className="nav-items">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/reviews">Reviews</Nav.Link> */}
          <Nav.Link as={Link} to="/all-scores">All Scores</Nav.Link>
          <Nav.Link as={Link} to="/quizselector">
            Create Quiz
          </Nav.Link>
        </Nav>
        <Nav>
          <UserSearch loggedInUser={loggedInUser} />
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
            <>
            {/* <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link> */}
          </>
          )}
        </Nav>
        <div className="review-button">

          <Button
            variant="primary"
            onClick={handleReviewButtonClick}
          >
            <span className="me-2">Reviews</span>
            <span className="text-warning">★★★★★</span>
          </Button>
        </div>
        {/* {loggedInUser?(<LogoutButton loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>) : <></>} */}

      </Container>

    </Navbar>
    </>
  );
}

export default UserBar;
