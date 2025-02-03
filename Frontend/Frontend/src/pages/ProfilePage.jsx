import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";
import ProfileForm from "../components/ProfileForm";
import "../CSS/FriendProfileDisplay.css"

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

    const [pageQuizzesTaken, setPageQuizzesTaken] = useState(0);
    const [pageQuestionsAnswered, setPageQuestionsAnswered] = useState(0);
    const [pageTotalCorrectAnswers, setPageTotalCorrectAnswers] = useState(0);
    const [pageCorrectAnswerPercentage, setPageCorrectAnswerPercentage] = useState(0);
    const [pageLevel, setPageLevel] = useState(1);

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
                navigate("/error");
            }
            return response.json()})
        //}
        .then((data) =>
        {
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
            setPageQuizzesTaken(data.quizzesTaken);
            setPageQuestionsAnswered(data.questionsAnswered);
            setPageTotalCorrectAnswers(data.totalCorrectAnswers);
            setPageCorrectAnswerPercentage(data.correctAnswerPercentage);
            setPageLevel(data.level);
            })

    ;
        fetch(`http://localhost:8080/friendlist/username?username=${username}`, fetchSpecifications)
        .then((response) => response.json())
        .then((data) => {setPageFriendList(data);
                         })

    ;

        if (loggedInUser) {
            if(loggedInUser.username === username){
                setOwnerPage(true);
                }
            else{
                setOwnerPage(false);
                }
        }
           }, [loggedInUser, editMode, params, ownerPage]);

    function EnableEditMode(){
        setEditMode(true)
        }

    //Tester
    function DisableEditMode(){
        setEditMode(false)
        }

    function handleEdit(profileData){
        DisableEditMode();
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
                 <div className='userProfile-container'>
                                <ul>
                                <h2> Username: {params.username} </h2>
                                 <p> Email: {pageEmail} </p>
                                 <p> Name: {pageName}</p>
                                 <p> Location: {pageLocation}</p>
                                 <p> Occupation: {pageOccupation}</p>
                                {ownerPage?(<button type ="button" className="search-button" onClick={EnableEditMode} > Edit Page </button>):<div></div>}
                                 </ul>
                         </div>
                  <div className="bio-container">
                      <ul>
                      <h2>User Biography</h2>
                      <p> {pageBio} </p>
                      </ul>
                      </div>
                </div>
                         }
            <div>
             <div className="statProfile-container">
                 <ul>
                     <h2> Let's See Where You Stand, Pardner! </h2>
                    <p> High Score: {pageScore}</p>
                    <p> Level: {pageLevel} </p>
                    <p> Quizzes Taken: {pageQuizzesTaken}</p>
                    <p> Questions Answered: {pageQuestionsAnswered}</p>
                    <p> Correctly Answered Questions: {pageTotalCorrectAnswers}</p>
                    <p> Career Percentage Correct: {pageCorrectAnswerPercentage}</p>
                </ul>
             </div>
            <div className="friendProfile-container">
             <ul>
                 <h1> Friend List </h1>
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
            </div>
                </div>

            <footer className="profileFooterRight">  Handshake designed by <a href={"https://www.freepik.com/"}> Freepik </a> </footer>
                        <footer className="profileFooterLeft">  Trophy designed by <a href={"https://www.freepik.com/"}> Freepik </a> </footer>

        </div>

    );
}

export default ProfilePage;