import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chatbox = ({ loggedInUser, chatId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageReceiver, setMessageReceiver] = useState({});
  const [messageSender, setMessageSender] = useState({});

  const stompClient = useRef(null);
  const scrollContainerRef = useRef(null);

  const getChatInfo = async (chatId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/chatinfo?chatid=${chatId}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to get chat information: ${response.statusText}`
        );
      }
      const info = await response.json();
      console.log("getChatInfo: ", info);
      console.log("Logged in user: ", loggedInUser);
      setMessageSender(loggedInUser);
      const receiver =
        loggedInUser.id === info.user1.id ? info.user2 : info.user1;
      console.log(
        "Receiver var. should not be logged in user information. ",
        receiver
      );
      setMessageReceiver(receiver);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/messages?chatId=${chatId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching chat messages: ${response.statusText}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatInfo(chatId);
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/private.${chatId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });

      getMessages();
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [chatId]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageObj = {
        user1: loggedInUser,
        user2: messageReceiver, // Friend object needs to be passed into here.
        content: message.trim(),
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now(), // Temporary ID for UI purposes
          ...messageObj,
        },
      ]);
      stompClient.current.send(
        `/app/chat.private.${chatId}`,
        {},
        JSON.stringify(messageObj)
      );
      setMessage("");
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        {loading ? (
          <Modal.Title>Loading...</Modal.Title>
        ) : (
          <Modal.Title>Chat with {messageReceiver.username}</Modal.Title>
        )}
      </Modal.Header>
      {/* <Modal.Body>
        <div
          style={{ maxHeight: "300px", overflowY: "auto" }}
          ref={scrollContainerRef}
        >
          {messages.map((message) => (
            <div className="card-body" key={message.id}>
              <div>
                {}: {message.content}
              </div>
            </div>
          ))}
        </div>
      </Modal.Body> */}
      <Modal.Body>
  <div style={{ maxHeight: "300px", overflowY: "auto" }} ref={scrollContainerRef}>
    {messages.map((message) => (
      <div
        key={message.id}
        style={{
          display: "flex",
          justifyContent: message.user1.id === loggedInUser.id ? "flex-start" : "flex-end",
          margin: "10px 0",
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: message.user1.id === loggedInUser.id ? "#d1f7c4" : "#f1f0f0",
          }}
        >
          <strong>
            {message.user1.id === loggedInUser.id
              ? loggedInUser.username
              : messageReceiver?.username}
          </strong>
          <div>{message.content}</div>
        </div>
      </div>
    ))}
  </div>
</Modal.Body>
      <Modal.Footer>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Chatbox;
