import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Scoreboard from "../components/Scoreboard";


function ScorePage() {

    return (
        <div>
            <h2>High Scores</h2>
            <Scoreboard/>
        </div>
    );

}

export default ScorePage;