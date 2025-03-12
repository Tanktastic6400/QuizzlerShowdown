import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function UserSearch({ loggedInUser }) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  function usersSearch() {
    fetch(`http://localhost:8080/userservice/search/users?username=${username}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setUsers(data);
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  };


  const handleSendRequest = async (index) => {
    const user = users[index];
    const user2Id = user.id;
    const sender = loggedInUser;
    const user1Id = sender.id;

    console.log(`Friend ID: ${user2Id} Logged in user ID: ${user1Id}`);

    const response = await fetch("http://localhost:8080/friendlist/send-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user1Id,
        user2Id
      }),
    })
  };


  function handleChange(event) {
    setUsername(event.target.value);
  }

  function handleNavigation(username) {
    navigate(`/profile/${username}`);
  }

  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={username}
        onChange={handleChange}
      />
      <Button className="search-button" variant="warning" size="small" onClick={usersSearch}>Search</Button>
      <div>
        {users.map((foundUser, index) => (
          <div key={foundUser.id}>
            <a href="#" onClick={() => handleNavigation(foundUser.username)}>
              {foundUser.username}
            </a>
            {" "}
            <Button
              className="search-button"
              size="small"
              variant="outline-warning"
              onClick={() => handleSendRequest(index)}
            >
              Send Request
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserSearch;
