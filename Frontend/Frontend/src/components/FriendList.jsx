import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const FriendList = ({ loggedInUser, getUserInfo, onOpenChat }) => {
  const [friendList, setFriendList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const [requestId, setRequestId] = useState("");


  useEffect(() => {
    fetch(`http://localhost:8080/friendlist/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, [loggedInUser]);

  const handleAccept = async (id) => {
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
            status: "ACCEPTED", 
          }),
        }
      );
    } catch (error) {}
  };

  const handleDecline = async (id) => {
    try {
      const declineResponse = await fetch(
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

  const friendClicked = async (clickedFriend) => {
    const friendIndex = friendList.findIndex((friend) => friend.id === clickedFriend);
    if (friendIndex !== -1) {
      const selectedFriend = friendList[friendIndex];
      setSelectedFriend(selectedFriend); 
      console.log(selectedFriend);
      const response = await fetch(
        `http://localhost:8080/chat/chatid?user1=${loggedInUser.id}&user2=${selectedFriend.friends.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const chatId = await response.text();
      if (chatId) {
        console.log(chatId);
        onOpenChat(chatId); 
      }
     else {
      console.error("Friend not found!");
    }
  }
  };


  return (
    <>
  <div className="friend-container">
    {friendList.map((friend) => (
      <div key={friend.id}>
        {friend.status === "ACCEPTED" && (
          <div>
            {friend.friends.username}
            <button onClick={() => friendClicked(friend.id)}>Chat</button>
          </div>
        )}
        {friend.status === "PENDING" && (
          <div>
            {friend.friends.username}
            <button onClick={() => handleAccept(friend.requestId)}>Accept</button>
            <button onClick={() => handleDecline(friend.requestId)}>Decline</button>
          </div>
        )}
      </div>
    ))}
  </div>
</>
  );
};

export default FriendList;
