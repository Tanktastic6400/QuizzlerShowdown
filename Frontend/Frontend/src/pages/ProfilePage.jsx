import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";

function ProfilePage ( { loggedInUser, getUserInfo } ) {

    const [pageUserName, setPageUserName] = useState("");
    const [pageEmail, setPageEmail] = useState("");

    const [ownerPage, setOwnerPage] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [pageBio, setPageBio] = useState("");
    const [pageName, setPageName] = useState("");
    const [pageLocation, setPageLocation] = useState("");
    const [pageOccupation, setPageOccupation] = useState("");

    const [pageScore, setPageScore] = useState(0);

    const [pageFriendList, setPageFriendList] = useState([]);

    const navigate = useNavigate();

    let params = useParams();

    useEffect(() => {

        const username = params.username
        const fetchSpecifications = {
            method: "GET",
            }
        fetch(`http://localhost:8080/userservice/findUser?username=${username}`, fetchSpecifications)
        .then((response) =>
        {
            if (!response.ok) { //If it's not a real user navigate away to homepage.
                navigate("/");
            }
            return response.json()})
        //}
        .then((data) =>
        {
            //console.log(data);
            setPageUserName(data.username);
            setPageEmail(data.email);

            return fetch(`http://localhost:8080/userservice/findProfile?id=${data.id}`, fetchSpecifications);
        })

        .then((response) => response.json())
        .then((data) =>
        {
            setPageBio(data.bio);
            setPageName(data.name);
            setPageLocation(data.location);
            setPageOccupation(data.occupation);
            setPageScore(data.score);

            })

    ;
        fetch(`http://localhost:8080/friendlist/username?username=${username}`, fetchSpecifications)
        .then((response) => response.json())
        .then((data) => {setPageFriendList(data);
                         })

    ;

        if (loggedInUser) {
            if(loggedInUser.username === pageUserName){
                setOwnerPage(true);
                }
            else{
                setOwnerPage(false);
                }
        }
         //         },[]);
           }, [loggedInUser, editMode]); //Why this versus []?

    function EnableEditMode(){
        setEditMode(true)
        }

    //Tester
    function DisableEditMode(){
        setEditMode(false)
        }

    //THIS IS OUTDATED! And possibly not even doing anything?
    function handleEdit(profileData){
        DisableEditMode();
        //setPageBio(profileData);     //Update to be more than just bio
        //Try to get this to update "in real time" rather than a refresh.
        }

    return (
        <div>
            {editMode? (<div>
                <ProfileForm onEditSubmitted={handleEdit} username={pageUserName} bio={pageBio} name={pageName}
                location={pageLocation} occupation={pageOccupation}
                />
            </div>)
            :
            <div>
            <p> Username: {params.username} </p>
             <p> Email: {pageEmail} </p>
             <p> Name: {pageName}</p>
             <p> Bio: {pageBio} </p>
             <p> Location: {pageLocation}</p>
             <p> Occupation: {pageOccupation}</p>
             <p> High Score: {pageScore}</p>
            <p> Friends </p>
             <ul>
                 {pageFriendList.filter(friend=> friend.status === "ACCEPTED")
                     .map( (friend) => (
                         <li key={friend.id}>
                     {friend.user1.username===params.username?
                     (<a href={`http://localhost:5173/profile/${friend.user2.username}`}>
                         {friend.user2.username}
                    </a>):
                    <a href={`http://localhost:5173/profile/${friend.user1.username}`}>
                        {friend.user1.username}
                    </a>}
                    </li>
                 ))}
            </ul>
                {ownerPage?(<button type ="button" onClick={EnableEditMode} > Edit Page </button>):<div></div>}
                </div>
             }
            {/*}<ProfileView passedUsername={pageUserName}/>*/}
        </div>
    );
}

export default ProfilePage;