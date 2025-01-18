
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chatbox = ({ loggedInUser, chatId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stompClient = useRef(null);

  const toggleShowChat = () => setShowChat(!showChat);

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
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      console.log("Connected to WebSocket");
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
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messageObj = {
        sender: loggedInUser,
        recipient: loggedInUser, // Replace with dynamic user data
        content: message.trim(),
      };
      if (stompClient.current && stompClient.current.send) {
        stompClient.current.send(
          `/app/chat.private.${chatId}`,
          {},
          JSON.stringify(messageObj)
        );
      } else {
        console.error("STOMP client is not initialized or connected.");
      }
      setMessage("");
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={toggleShowChat}>
        {showChat ? "Close Chat" : "Open Chat"}
      </Button>

      <Modal show={showChat} onHide={toggleShowChat} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <p>Loading messages...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {messages.map((message) => (
                <div key={message.id} className="mb-2">
                  <div>
                    <strong>{message.username}</strong>: {message.content}
                  </div>
                  <small className="text-muted">{message.timestamp}</small>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <input
            type="text"
            className="form-control me-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <Button variant="success" onClick={sendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Chatbox;
