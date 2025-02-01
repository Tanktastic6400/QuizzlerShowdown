import React, { useState, useEffect } from "react";

function AllScoresPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/scoreservice/getAllScores")
    .then(response => response.json())
    .then(data => setScores(data))
    .catch(error => console.error('Error loading scores:', error));
  }, []);

  return (
    <div>
      <h2>All Users and Scores</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((userProfile, index) => (
            <tr key={index}>
              <td>{userProfile.user.username}</td> 
              <td>{userProfile.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllScoresPage;
