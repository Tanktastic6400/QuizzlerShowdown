import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Scoreboard() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchSpecifications = {
      method: "GET",
    };
    fetch(
      "http://localhost:8080/scoreservice/getTopScores",
      fetchSpecifications
    )
      .then((response) => response.json())
      .then((data) => {
        setHighScores(data);
      });
  }, []);

  return (
    <div className="score-container">
      <h2> Top 10 </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((player, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scoreboard;
