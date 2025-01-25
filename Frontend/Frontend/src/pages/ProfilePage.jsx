import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";

function ProfilePage ( { loggedInUser, getUserInfo } ) {
    const [pageUserName, setPageUserName] = useState("");
    const [pageEmail, setPageEmail] = useState("");

    const [ownerPage, setOwnerPage] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [pageBio, setPageBio] = useState(""); //FOR TESTING
    const [pageLocation, setPageLocation] = useState("");

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
            console.log(data);
            setPageUserName(data.username)
            setPageEmail(data.email)
            return fetch(`http://localhost:8080/userservice/findProfile?id=${data.id}`, fetchSpecifications);
        })
                                    //change to response.json when it's back to DTO
        .then((response) => response.json())
        .then((data) =>
        {
            setPageBio(data.bio); //change to .data once it's not just bio.
            setPageLocation(data.location);
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
           }, [loggedInUser]); //Why this versus []?

    function EnableEditMode(){
        setEditMode(true)
        }

    //Tester
    function DisableEditMode(){
        setEditMode(false)
        }

    function handleEdit(profileData){
        setPageBio(profileData);     //Update to be more than just bio
        //Try to get this to update "in real time" rather than a refresh.
        }


    return (
        <div>
            {editMode? (<div>
                <button type ="button" onClick={DisableEditMode} > Finish </button>
                <ProfileForm onEditSubmitted={handleEdit} bio={pageBio} username={pageUserName} location={pageLocation} />
            </div>)
            :
            <div>
            <p> Username: {pageUserName} </p>
             <p> Email: {pageEmail} </p>
             <p> Name: </p>
             <p> Bio: {pageBio} </p>
             <p> Location: {pageLocation}</p>
             <p> Occupation: </p>
                {ownerPage?(<button type ="button" onClick={EnableEditMode} > Edit Page </button>):<div></div>}
                </div>
             }
            {/*}<ProfileView passedUsername={pageUserName}/>*/}
        </div>
    );
}

export default ProfilePage;