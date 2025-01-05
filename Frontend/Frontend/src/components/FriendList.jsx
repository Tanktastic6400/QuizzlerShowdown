import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";
import DropdownButton from 'react-bootstrap/DropdownButton';

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");

  useEffect(() => {
    // get friends list here.
    fetch("http://localhost:8080/friendlist/1?userId=1")
      .then((response) => response.json())
      .then((data) => {
        setFriendList(data);
      });
  }, []);

  useEffect(() => {
    console.log(friendList); // Logs the updated friendList
  }, [friendList]);

  const handleAccept = async (e) => {
    try {
      const acceptResponse = await fetch(
        "http://localhost:8080/friendlist/respond-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friendshipId: 4, // Pass the friendship ID
            status: "ACCEPTED", // Pass the accepted status
          }),
        }
      );
    } catch (error) {}
  };

  const handleDecline = async (e) => {
    try {
      const acceptResponse = await fetch(
        "http://localhost:8080/friendlist/respond-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            friendshipId: 2, // Pass the friendship ID
            status: "REJECTED", // Pass the accepted status
          }),
        }
      );
    } catch (error) {}
  };

  return (
    //Display approved friends and friends waiting on a response.
    
      <Dropdown>
        <DropdownButton variant="warning" title="Friends">
          {friendList.map((friend) => (
            <Dropdown.Item key={friend.id}>
            <div>
              User: {friend.friends.username} Status: {friend.status}
            </div>
              {friend.status === "PENDING" && (
                <div>
                  <button onClick={() => handleAccept(friend.id)}>
                    Accept
                  </button>
                  <button onClick={() => handleDecline(friend.id)}>
                    Decline
                  </button>
                </div>
              )}
            </Dropdown.Item>
            
          ))}
          <DropdownDivider />
          </DropdownButton>
      </Dropdown>
    
  );
};

export default FriendList;
