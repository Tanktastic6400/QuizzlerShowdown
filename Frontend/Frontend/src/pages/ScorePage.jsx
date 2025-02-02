import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Scoreboard from "../components/Scoreboard";


function ScorePage({loggedInUser, getUserInfo}) {

    //getUserInfo();
    //console.log("PAGE")
    //console.log({loggedInUser});
     //console.log(JSON.stringify(loggedInUser.id));
     ///console.log({loggedInUser.id})

    //console.log(JSON.stringify(loggedInUser.id));



    return (
        <div>
            <h2>High Scores</h2>
            <Scoreboard loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>
        </div>
    );

}

export default ScorePage;