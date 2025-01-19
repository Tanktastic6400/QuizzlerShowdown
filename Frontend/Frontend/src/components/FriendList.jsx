import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const FriendList = ({ loggedInUser, getUserInfo, onOpenChat }) => {
  const [friendList, setFriendList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();


  useEffect(() => {
    fetch(`http://localhost:8080/friendlist/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => setFriendList(data));
  }, [loggedInUser]);


  const friendClicked = async (clickedFriend) => {
    const friendIndex = friendList.findIndex((friend) => friend.id === clickedFriend);
    if (friendIndex !== -1) {
      const selectedFriend = friendList[friendIndex];
      setSelectedFriend(selectedFriend); 
      console.log(selectedFriend);
      const response = await fetch(
        `http://localhost:8080/chat/chatid?sender=${loggedInUser.id}&receiver=${selectedFriend.friends.id}`,
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

      console.log(`this is the data ${chatId}`);
      if (chatId) {
        
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
          <button onClick={() => friendClicked(friend.id)}>
            {friend.friends.username}
          </button>
        </div>
      ))}
      </div>
    </>
  );
};

export default FriendList;
