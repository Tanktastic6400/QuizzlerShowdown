import React, { useState, useEffect} from "react";

function UserSearch() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);


  function usersSearch() {
    fetch(`http://localhost:8080/userservice/searchusers?username=${username}`)
    .then((response) => response.json())
    .then((data) => setUsers(data));
  }

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
        {users.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </div>
  );
}

export default UserSearch;
