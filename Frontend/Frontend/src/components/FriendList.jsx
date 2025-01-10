import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";
import DropdownButton from "react-bootstrap/DropdownButton";
import FindFriend from "./FindFriend";

const FriendList = ({loggedInUser}) => {
  const [friendList, setFriendList] = useState([]);
  const [friendStatus, setFriendStatus] = useState("");
  const [requestId, setRequestId] = useState("");
  
  useEffect(() => {
    console.log("From the friends list " + loggedInUser.id);
    // get friends list here.
    fetch(`http://localhost:8080/friendlist/${loggedInUser.id}?userId=${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendList(data);
      });
  }, []);

  useEffect(() => {
    console.log(friendList); // Logs the updated friendList
  }, [friendList]);

  const handleAccept = async (id) => {
    console.log(requestId);
    try {
      const acceptResponse = await fetch(
        "http://localhost:8080/friendlist/respond-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: id, // Pass the friendship ID. Currently the friend_list database id
            status: "ACCEPTED",
          }),
        }
      );
    } catch (error) {}
  };

  const handleDecline = async (id) => {
    try {
      const acceptResponse = await fetch(
        "http://localhost:8080/friendlist/respond-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: id,
            status: "REJECTED",
          }),
        }
      );
    } catch (error) {}
  };

  return (
    <Dropdown>
      <DropdownButton variant="warning" title="Friends">
        {friendList.map((friend) => (
          <Dropdown.Item key={friend.id}>
            <div>
              User: {friend.friends.username} Status: {friend.status} Request ID: {friend.requestId}
            </div>
            {friend.status === "PENDING" && (
              <div>
                <button onClick={() => handleAccept(friend.requestId)}>Accept</button>
                <button onClick={() => handleDecline(friend.requestId)}>
                  Decline
                </button>
              </div>
            )}
          </Dropdown.Item>
        ))}
        <DropdownDivider />
        <FindFriend loggedInUser={loggedInUser}/>
      </DropdownButton>
    </Dropdown>
  );
};

export default FriendList;
