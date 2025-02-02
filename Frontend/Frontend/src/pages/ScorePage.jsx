import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Scoreboard from "../components/Scoreboard";


function ScorePage({loggedInUser, getUserInfo}) {
    return (
        <div>
            <h2>High Scores</h2>
            <Scoreboard loggedInUser={loggedInUser} getUserInfo={getUserInfo}/>
        </div>
    );

}

export default ScorePage;