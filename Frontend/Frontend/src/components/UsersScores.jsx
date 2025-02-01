import React, { useState, useEffect } from 'react';

const UsersScores = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchAllScores = async () => {
            try {

                const response = await fetch("http://localhost:8080/scoreservice/getAllScores", {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                console.log(data);

                setScores(data);
            } catch (error) {
                console.error("Error fetching all scores:", error);
            }
        };

        fetchAllScores();
    }, []);

    return (
        <div>
            <h2>All Users and Scores</h2>
            <table>
                <thead>
                    <tr>
                        <th>&#8470;</th>
                        <th>User</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.username}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersScores;
