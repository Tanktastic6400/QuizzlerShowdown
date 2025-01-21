import React, { useState, useEffect} from "react";
import Button from "react-bootstrap/esm/Button";

function UserSearch({loggedInUser}) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  

  function usersSearch() {
    fetch(`http://localhost:8080/userservice/searchusers?username=${username}`)
    .then((response) => response.json())
    .then((data) => setUsers(data));
    
  }

  const handleSendRequest = async (index) => {
    const user = users[index];
    const userId = loggedInUser.id;
    const friendId = user.id;

console.log(`Friend ID: ${friendId} Logged in user ID: ${loggedInUser.id}`);

      const response = await fetch("http://localhost:8080/friendlist/send-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            friendId
          }), 
      })
  };


  function handleChange(event) {
    setUsername(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={username}
        onChange={handleChange}
      />
      <button onClick={usersSearch}>Search</button>
      <ul>
      {users.map((foundUser, index) => (
          <li key={foundUser.id}>
            {foundUser.username}{" "}
            <Button onClick={() => handleSendRequest(index)}>Send Request</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserSearch;
