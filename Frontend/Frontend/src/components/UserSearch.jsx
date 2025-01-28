import React, { useState, useEffect} from "react";

import { Button } from "react-bootstrap";

function UserSearch({loggedInUser}) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  
  function usersSearch() {
    fetch(`http://localhost:8080/userservice/search/users?username=${username}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setUsers(data);
        })
        .catch(function(error) {
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

  return (
    <div className="user-search-container">
      <input
        type="text"
        placeholder="Search users..."
        value={username}
        onChange={handleChange}
      />
      <button className="search-button" onClick={usersSearch}>Search</button>
      <ul>
      {users.map((foundUser, index) => (
          <li key={foundUser.id}>
            {foundUser.username}{" "}
            <Button className="search-button" onClick={() => handleSendRequest(index)}>Send Request</Button>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserSearch;
