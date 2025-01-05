import React, { useEffect, useState } from 'react'

const FriendList = () => {
    const [friendList, setFriendList] = useState([]);
    const [friendStatus, setFriendStatus] = useState();


    useEffect(() => {
        // get friends list here. 
        fetch("http://localhost:8080/friendlist/1?userId=1")
        .then((response) => response.json())
        .then((data) => {
            setFriendList(data);   
        })  
    }, []);

    useEffect(() => {
        console.log(friendList); // Logs the updated friendList
    }, [friendList]);

  return (
    //Display approved friends and friends waiting on a response. 
    <div>FriendList</div>
  )
}

export default FriendList
