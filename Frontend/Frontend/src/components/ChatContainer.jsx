import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import Chatbox from "./Chatbox";
import FriendList from "./FriendList";

const ChatContainer = ({ loggedInUser, getUserInfo }) => {
  const [chatId, setChatId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getChatUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/chatinfo?chatid=${chatId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching chat messages: ${response.statusText}`);
      }
      const data = await response.json();

      setChatInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatUsers();
    }
  }, [chatId]);

  const handleOpenChat = (chatId) => {
    setChatId(chatId);
    setShowPopover(false);
    setShowChat(true);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Friend List</Popover.Header>
      <Popover.Body>
        <FriendList
          loggedInUser={loggedInUser}
          getUserInfo={getUserInfo}
          onOpenChat={handleOpenChat}
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
          <Button className="friend-button" variant="success">
            Friends
          </Button>
        </OverlayTrigger>
      </div>

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
