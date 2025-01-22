import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import ProfileView from "../components/ProfileView";


function ProfilePage () {

    let params = useParams();

    useEffect(() => {

                    //const id = loggedInUser.id; //Keeps on becoming null. Ugh. Stay. I'm logged in!
//                    const fetchSpecifications = {
//                                         method: "GET",
//                                         }                                 //Hard coded 7 for a test.
//                        fetch(`http://localhost:8080/scoreservice/getScore/${7}`, fetchSpecifications)
//                      .then((response) => response.json())
//                      .then((data) =>
//                            {
    //                               console.log(data);
//                            setProfileUserScore(data);
//                          });
                  },[]);

    console.log(params.username)

    return (
        <div>
            <ProfileView/>
        </div>
    );
}

export default ProfilePage;