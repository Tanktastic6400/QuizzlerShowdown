import React, { useState, useEffect} from "react";
import Button from "react-bootstrap/esm/Button";

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
    console.log("this is the friend: ", user);
    const user2Id = user.id;
    console.log("this is the FID: ", user2Id);
    console.log("logged in user :", loggedInUser);
    const sender = loggedInUser;
    console.log("this is the logged in user : ", sender);
    const user1Id = sender.id;
    console.log("this is the logged in user id: ", user1Id);
    

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
