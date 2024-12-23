import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Card from 'react-bootstrap/Card';


const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    
    // Use useRef to store stompClient so it persists across renders
    const stompClient = useRef(null);

    //this will be set by userids of sender and receiver
    const getChatId = () => {

      return "1234";
    }

    const chatId = getChatId();

    useEffect(() => {
      // Connect to the WebSocket server
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient.current = Stomp.over(socket);
  
      stompClient.current.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.current.subscribe(`/topic/private.${chatId}`, (message) => {
          console.log(chatId);
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
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
          sender: 1, // Replace with dynamic user data
          content: message.trim(),
        };
        console.log('Sending message:', messageObj);
        if (stompClient.current && stompClient.current.send) {
          ///app/chat.sendMessage
          stompClient.current.send(`/app/chat.private.${chatId}`, {}, JSON.stringify(messageObj));
        } else {
          console.error("STOMP client is not initialized or connected.");
        }
        
        setMessage('');
      }
    };

    return (
      <Card border="warning" style={{ width: '30rem' }}>
  <Card.Header>Receiver Username</Card.Header>
  <Card.Body>
    {messages.map((message) => (
      <div className="card-body" key={message.id}>
        <div>
        Sent at:{message.timestamp} User:{message.username}: {message.content}
        </div>
        {/* <div></div> */}
      </div>
    ))}
  </Card.Body>
  <Card.Footer>
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message"
    />
    <button onClick={sendMessage}>Send</button>
  </Card.Footer>
</Card>

      );
    };
    
export default Chatbox;