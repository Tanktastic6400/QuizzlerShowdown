import React, { useEffect, useState, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Card from 'react-bootstrap/Card';


const Chatbox = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    
    // Use useRef to store stompClient so it persists across renders
    const stompClient = useRef(null);

    useEffect(() => {
      // Connect to the WebSocket server
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient.current = Stomp.over(socket);
  
      stompClient.current.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.current.subscribe('/topic/messages', (message) => {
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
  
    // Function to send messages
    const sendMessage = () => {
      if (message.trim() !== "") {
        const messageObj = {
          sender: 1, // Replace with dynamic user data
          content: message.trim(),
        };
        console.log('Sending message:', messageObj);
  
        // Ensure stompClient is defined and connected
        if (stompClient.current && stompClient.current.send) {
          stompClient.current.send('/app/chat.sendMessage', {}, JSON.stringify(messageObj));
        } else {
          console.error("STOMP client is not initialized or connected.");
        }
        
        setMessage(''); // Clear input after sending
      }
    };

    return (
        <Card border="warning" style={{ width: '30rem' }}>
        <Card.Header>Receiver Username</Card.Header>
        <div>
            <Card.Text>
          <div>
          {messages.map((message) => (
            <div class="card-body" key={message.id}>
              <p>{message.username}: {message.content}</p>
              <p>Sent at: {message.createdAt}</p>
            </div>
          ))}
        </div>
        </Card.Text>
        <Card.Footer>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={sendMessage}>Send</button>
          </Card.Footer>
          </div>
        </Card>
      );
    };
    
export default Chatbox;