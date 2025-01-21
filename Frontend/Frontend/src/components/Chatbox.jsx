import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const Chatbox = ({ loggedInUser, chatId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stompClient = useRef(null);


  //this will be set by userids of sender and receiver
  const getChatId = () => {
    return "1-2";
  };

  const chatId = getChatId();

  const scrollContainerRef = useRef(null);


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
        sender: loggedInUser,
        recipient: loggedInUser, // Friend object needs to be passed into here. 
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
        <Modal.Title>Chat with {}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ maxHeight: "300px", overflowY: "auto" }} ref={scrollContainerRef}>
        {messages.map((message) => (
                <div className="card-body" key={message.id}>
                  <div>
                    {message.recipient.username}:{" "}
                    {message.content}
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
