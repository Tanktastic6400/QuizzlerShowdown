import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Scoreboard({ loggedInUser, getUserInfo }) {
  const [currentUserScore, setCurrentUserScore] = useState(0);
  const [highScores, setHighScores] = useState([]);


  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch("http://localhost:8080/scoreservice/getTopScores");
        const scores = await response.json();
        setHighScores(scores);
      } catch (error) {
        console.error("Error fetching top scores:", error);
      }
    };
  
    const fetchUserTopScore = async () => {
      try {
        const response = await fetch(`http://localhost:8080/scoreservice/getScore/${loggedInUser.id}`);
        const scoreOfUser = await response.json();
        setCurrentUserScore(scoreOfUser);
      } catch (error) {
        console.error("Error fetching user top score:", error);
      }
    };

    fetchTopScores(); 

    if (loggedInUser) {
      fetchUserTopScore(); 
    }
  }, [loggedInUser, highScores, currentUserScore]);

  return (
    <div className="top-ten-container">
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
          {highScores.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <strong>Your Top Score: </strong>{currentUserScore}
      {}
    </div>
  );
}

export default Scoreboard;
