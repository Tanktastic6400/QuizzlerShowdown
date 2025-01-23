import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

const FindFriend = ({loggedInUser}) => {

  const [foundUserName, setFoundUserName] = useState();
  const [friendId, setFriendId] = useState();
  const [userId, setUserId] = useState();
  const [requestId, setRequestId] = useState("");

      useEffect(() => {
        console.log(loggedInUser); // Logs the updated friendList
        if(loggedInUser != null){
            setUserId(loggedInUser.id);
        }
      }, [loggedInUser]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const userToSearch = e.target.usernameValue.value.trim();

    try {
      const response = await fetch(
        `http://localhost:8080/friendlist/findfriends?username=${userToSearch}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data != null) {
        const { id, username, email} = data[0];
        setFoundUserName(username);
        setFriendId(id);
      } else {
        console.log("User was not found");
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

    const handleSendRequest = async (e) => {
        e.preventDefault();
        setRequestId(`${loggedInUser.id}-${friendId}`)
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
    }

  return (
    <div>
    <form onSubmit={handleSearch}>
      <input type="text" name="usernameValue" placeholder="Search friends" />
      <button type="submit">Search</button>
    </form>

    {foundUserName && friendId && (
    <div style={{ border: "1px solid #ccc", marginTop: "20px", padding: "10px", borderRadius: "5px" }}>
      <h6>User Found:</h6>
      <p><strong>Username:</strong> {foundUserName} | <strong>User ID:</strong> {friendId}</p>
      <Button onClick={handleSendRequest} />
    </div>
  )}
  </div>
  );
};

export default FindFriend;
