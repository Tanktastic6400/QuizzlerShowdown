import React, { useState } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import Chatbox from "./Chatbox";
import FriendList from "./FriendList";

const ChatContainer = ({ loggedInUser, getUserInfo }) => {
  const [chatId, setChatId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const handleOpenChat = (chatId) => {
    console.log(`Called from the chatContainer:  ${chatId}`);
    setChatId(chatId); // Set the chatId
    setShowPopover(false); // Close the popover
    setShowChat(true); // Open the chat modal
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Friend List</Popover.Header>
      <Popover.Body>
        <FriendList
          loggedInUser={loggedInUser}
          getUserInfo={getUserInfo}
          onOpenChat={handleOpenChat} // Pass the handler to FriendList
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <>
    <div className="chatbox-container">
      <OverlayTrigger
        trigger="click"
        placement="top"
        overlay={popover}
        show={showPopover}
        onToggle={() => setShowPopover(!showPopover)}
      >
        <Button className="friend-button" variant="success">Friends</Button>
      </OverlayTrigger>
      </div>
      {/* Chat Modal */}
      {showChat && (
        <Chatbox
          loggedInUser={loggedInUser}
          chatId={chatId}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default ChatContainer;
