import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Scoreboard (){

    const [highScores, setHighScores] = useState([]);

    const numbers = [1,2,3,4,5];
    const listItems = numbers.map((number) => <td>{number}</td>);



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
                    <tr>
                          {listItems}
                          {/*}<td>FILLER</td>
                          <td>FILLER</td>
                          <td>FILLER</td>*/}
                        </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Scoreboard