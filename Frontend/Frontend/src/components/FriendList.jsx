import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const FriendList = ({ loggedInUser, getUserInfo, onOpenChat }) => {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/friendlist/currentuser?userId=${loggedInUser.id}`
    )
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, [loggedInUser, friendList]);

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
    const friendIndex = friendList.findIndex(
      (friend) => friend.id === clickedFriend
    );
    if (friendIndex !== -1) {
      const selectedFriend = friendList[friendIndex];

      const friend =
        selectedFriend.user1.id === loggedInUser.id
          ? selectedFriend.user2
          : selectedFriend.user1;

      const response = await fetch(
        `http://localhost:8080/chat/chatid?user1=${loggedInUser.id}&user2=${friend.id}`,
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
        onOpenChat(chatId);
      } else {
        console.error("Friend not found!");
      }
    }
  };

  return (
    <>
      <div className="friend-container">
        {friendList.map((friend) => {
          const displayedUsername =
            loggedInUser.username === friend.user1.username
              ? friend.user2.username
              : friend.user1.username;

          return (
            <div className="user-friend-container" key={friend.id}>
              {friend.status === "ACCEPTED" && (
                <div className="friend-row">
                  <button onClick={() => friendClicked(friend.id)}>
                    {displayedUsername}
                  </button>
                  <Button variant="danger" onClick={() => handleDecline(friend.requestId)}>Remove</Button>
                </div>
              )}
              {friend.status === "PENDING" &&
                friend.user1.id !== loggedInUser.id && (
                  <div>
                    {displayedUsername}
                    <button onClick={() => handleAccept(friend.requestId)}>
                      Accept
                    </button>
                    <button onClick={() => handleDecline(friend.requestId)}>
                      Decline
                    </button>
                  </div>
                )}
              {friend.status === "PENDING" &&
                friend.user1.id === loggedInUser.id && (
                  <div>{displayedUsername} : PENDING </div>
                )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendList;
