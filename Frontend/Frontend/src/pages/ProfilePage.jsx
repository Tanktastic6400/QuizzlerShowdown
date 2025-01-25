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

    const [pageBio, setPageBio] = useState("FILLER BIO"); //FOR TESTING

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
            setPageEmail(data.email)
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
        setPageBio(profileData); //This works, but doesn't "stick" once you navigate away from the page.
        }

    //console.log(params.username)

    return (
        <div>
            {editMode? (<div>
                <button type ="button" onClick={DisableEditMode} > Finish </button>
                <ProfileForm onEditSubmitted={handleEdit}/>
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