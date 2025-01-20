import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownHeader from "react-bootstrap/DropdownHeader";
import ToastHeader from "react-bootstrap/esm/ToastHeader";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownDivider from "react-bootstrap/esm/DropdownDivider";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleShowChat = () => setShowChat(!showChat);

  // Use useRef to store stompClient so it persists across renders
  const stompClient = useRef(null);

  //this will be set by userids of sender and receiver
  const getChatId = () => {
    return "1-2";
  };

  const chatId = getChatId();

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
    console.log(messages);
  };

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      console.log("Connected to WebSocket");
      stompClient.current.subscribe(`/topic/private.${chatId}`, (message) => {
        console.log(chatId);
        const receivedMessage = JSON.parse(message.body);
        console.log("Received message:", receivedMessage);
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
        sender: 1,
        recipient: 2, // Replace with dynamic user data
        content: message.trim(),
      };
      console.log("Sending message:", messageObj);
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
    <>
      <Dropdown>
        <DropdownButton drop="up-centered" variant="warning" title="Messages">
          <Dropdown.Item>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {messages.map((message) => (
                <div className="card-body" key={message.id}>
                  <div>
                    Sent at:{message.timestamp} User:{message.username}:{" "}
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </Dropdown.Item>
          <DropdownDivider />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={sendMessage}>Send</button>
        </DropdownButton>
      </Dropdown>
    </>
  );
};

export default Chatbox;
