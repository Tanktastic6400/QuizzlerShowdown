import React from 'react';
import ReactDOM from 'react-dom';
import Chatbox from './Chatbox';
import FriendList from './FriendList';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

const ChatContainer = ({ loggedInUser, getUserInfo }) => {
  const popover = (
    <>
     {/* <Popover id="popover-basic">
       <Popover.Header as="h3">Friend List</Popover.Header>
       <Popover.Body> */}
        <FriendList loggedInUser={loggedInUser} getUserInfo={getUserInfo} />
        <Chatbox loggedInUser={loggedInUser} getUserInfo={getUserInfo} />
      {/* </Popover.Body>
    </Popover> */}
</>
  );

  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button variant="success">Click me to see</Button>
    </OverlayTrigger>
  );
};

// Example usage (replace with actual rendering logic in your app entry point)
ReactDOM.render(
    <ChatContainer loggedInUser={{ username: 'JohnDoe' }} getUserInfo={() => {}} />,
  document.getElementById('root')
);

export default ChatContainer;
