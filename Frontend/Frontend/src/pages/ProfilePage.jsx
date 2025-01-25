import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";

function ProfilePage ( { loggedInUser, getUserInfo } ) {
    const [pageUserName, setPageUserName] = useState("");
    const [pageEmail, setPageEmail] = useState("");
    const [ownerPage, setOwnerPage] = useState(false);

    //Let's hope this works. ^^;
    const [editMode, setEditMode] = useState(false);

    const [pageBio, setPageBio] = useState(""); //FOR TESTING

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
        .then((response) => response.text())
        .then((data) =>
        {
            setPageBio(data); //change to .data once it's not just bio.
            //console.log(data)
            })
    ;

        //console.log("IS THERE A USER LOGGED IN?")

        if (loggedInUser) {
            //console.log("LOGGED IN USER IS");
            //console.log(loggedInUser);
            //console.log("IS THIS YOUR PAGE?")
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
        //console.log("YOU CLICKED ME")
        }

    //Tester
    function DisableEditMode(){
        setEditMode(false)
        }

    function handleEdit(profileData){
        setPageBio(profileData);     //Update to be more than just bio
        //Try to get this to update "in real time" rather than a refresh.
        }

    //console.log(params.username)

    return (
        <div>
            {editMode? (<div>
                <button type ="button" onClick={DisableEditMode} > Finish </button>
                <ProfileForm onEditSubmitted={handleEdit} bio={pageBio} username={pageUserName} />
            </div>)
            :
            <div>
            <p> {pageUserName} </p>
             <p> {pageEmail} </p>
             <p> {pageBio} </p>
                {ownerPage?(<button type ="button" onClick={EnableEditMode} > Edit Page </button>):<div></div>}
                </div>
             }
            {/*}<ProfileView passedUsername={pageUserName}/>*/}
        </div>
    );
}

export default ProfilePage;