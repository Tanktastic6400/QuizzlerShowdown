import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";
import DropdownButton from "react-bootstrap/DropdownButton";
import FindFriend from "./FindFriend";
import Chatbox from "./Chatbox";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


const FriendList = ({loggedInUser}, {getUserInfo}) => {
  const [friendList, setFriendList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const [chatId, setChatId] = useState("");
 
  
  useEffect(() => {
    fetch(`http://localhost:8080/friendlist/${loggedInUser.id}?userId=${loggedInUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFriendList(data);
      });
      
  }, [loggedInUser]);

  
  const friendClicked = async (clickedFriend) => {
  
    const friendIndex = friendList.findIndex((friend) => friend.id === clickedFriend);
    setSelectedFriend(friendList[friendIndex]);
    console.log(selectedFriend.friends.id);
    const selectedFriendInfo = friendList[friendIndex];
    try {
      const response = await fetch(
        `http://localhost:8080/chat/chatid?sender=${loggedInUser.id}&receiver=${selectedFriendInfo.friends.id}`,
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
  
      const data = await response.text();
      <Chatbox chatId={data}/>
      console.log(`this is the data ${data}`);
    } catch (error) {
      console.error("Error fetching chat ID:", error);
    }
  };

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
    <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    {friendList.map((friend) => (
      <Popover.Body key={friend.id}>  
        <button onClick={() => friendClicked(friend.id)}>
          <div>
            User: {friend.friends.username}
          </div>
        </button>
        {friend.status === "PENDING" && (
          <div>
            <button onClick={() => handleAccept(friend.requestId)}>Accept</button>
            <button onClick={() => handleDecline(friend.requestId)}>Decline</button>
          </div>
        )}
      </Popover.Body>
    ))}
  </Popover>);

};

export default FriendList;
