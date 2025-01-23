import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";


function ProfilePage () {

    const [pageUserName, setPageUserName] = useState("");

    let params = useParams();

    useEffect(() => {
        const username = params.username
        const fetchSpecifications = {
            method: "GET",
            }
        fetch(`http://localhost:8080/userservice/findUser?username=${username}`, fetchSpecifications)
        .then((response) => response.json())
        .then((data) =>
        {
            console.log(data);
            setPageUserName(data.username)
        });
                  },[]);

    //console.log(params.username)

    return (
        <div>
            <p> {pageUserName} </p>
            <ProfileView/>
        </div>
    );
}

export default ProfilePage;