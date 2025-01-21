import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Scoreboard ({loggedInUser, getUserInfo}){

    const [currentUserScore, setCurrentUserScore] = useState(0);

    const [highScores, setHighScores] = useState([]);

    //console.log("COMPONENT")
    //console.log(loggedInUser.id)

    //const id = loggedInUser.id;
    //console.log(id);


    useEffect(() => {

        //getUserInfo();

         const fetchSpecifications = {
                             method: "GET",
                             }
          fetch("http://localhost:8080/scoreservice/getTopScores", fetchSpecifications)
          .then((response) => response.json())
          .then((data) => {setHighScores(data);
              //getUserInfo();
              //console.log(loggedInUser);
              //console.log(loggedInUser.id);
              });
      }, []);

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
                    setCurrentUserScore(data);
                  });
          },[]);



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
                                {currentUserScore}
                                {}

        </div>
    );
}

export default Scoreboard