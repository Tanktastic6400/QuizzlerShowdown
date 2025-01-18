import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Scoreboard (){

    const [highScores, setHighScores] = useState([]);

    const numbers = [1,2,3,4,5];
    const listItems = numbers.map((number) => <td>{number}</td>);

    useEffect(() => {

         const fetchSpecifications = {
                             method: "GET",
                             }
          fetch("http://localhost:8080/scoreservice/getAllScores", fetchSpecifications)
          .then((response) => response.json())
          .then((data) => {setHighScores(data);
              });

          console.log(highScores);

      }, []);

                 /*const fetchSpecifications = {
                     method: "GET",
                     }

                 fetch("http://localhost:8080/scoreservice/getAllScores", fetchSpecifications)
                 .then((response) => response.json())
                       .then((data) => {
                         setHighScores(data);
                       });
                   }, []);*/

    //useEffect(() => {
    //      getHighScores(); //
    //    }, []);


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
                    {highScores.map( (player) => (
                        <tr>
                            <td>FILLER</td>
                            <td>FILLER</td>
                            <td>{player.score}</td>

                        </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Scoreboard