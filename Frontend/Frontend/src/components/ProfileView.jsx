import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProfileView(){

    const [profileUserScore, setProfileUserScore] = useState(0);

    const name = "Filber Fillerton IV"
    const email = "filler1@filler.com"
    const bio = "This is a simple test of a user-made biography.";
    const pageUsername = "FILLER1";
    const location = "Middle Earth";
    const occupation = "Parasite";

       useEffect(() => {

                //const id = loggedInUser.id; //Keeps on becoming null. Ugh. Stay. I'm logged in!
                const fetchSpecifications = {
                                     method: "GET",
                                     }                                 //Hard coded 7 for a test.
                    fetch(`http://localhost:8080/scoreservice/getScore/${7}`, fetchSpecifications)
                  .then((response) => response.json())
                  .then((data) =>
                        {
                            console.log(data);
                        setProfileUserScore(data);
                      });
              },[]);

    function publicView(){
        return(
         <table>
                    <tbody>
                         <tr>
                             <p1>Name: {name}</p1>
                         </tr>
                        <tr>
                             <p1>Email: {email}</p1>
                         </tr>
                        <tr>
                             <p1>Location: {location} </p1>
                         </tr>
                        <tr>
                             <p1>Occupation: {occupation}</p1>
                        </tr>
                    </tbody>
         </table>);        }


    return (
        <div>

            <header style={{ textAlign: 'left'}}> {pageUsername}</header>
            <div> {publicView()}</div>

        {/*    <table>
            <tbody>
                 <tr>
                     <p1>Name: </p1>
                 </tr>
                <tr>
                     <p1>Email: </p1>
                 </tr>
                <tr>
                     <p1>Location: </p1>
                 </tr>
                <tr>
                     <p1>Occupation: </p1>
                </tr>
            </tbody>
            </table>*/}

           <h2>{profileUserScore}</h2>
           <textarea>
               TESTING
            </textarea>
            <p> {bio} </p>
        </div>
        );
}

export default ProfileView