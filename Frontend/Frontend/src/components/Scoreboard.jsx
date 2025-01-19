import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Scoreboard (){

    const [highScores, setHighScores] = useState([]);

    useEffect(() => {

         const fetchSpecifications = {
                             method: "GET",
                             }
          fetch("http://localhost:8080/scoreservice/getTopScores", fetchSpecifications)
          .then((response) => response.json())
          .then((data) => {setHighScores(data);
              });
      }, []);


    return (
        <div>
            <h2> Scoreboard </h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map( (player, index) => (<tr>
                            <td>{index+1}</td>
                            <td>{player.username}</td>
                            <td>{player.score}</td>
                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Scoreboard