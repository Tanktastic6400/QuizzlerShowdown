import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to Quizzler Showdown</h1>
            <p><Link to="/reviews">Reviews</Link></p>
        </div>
    );
};

export default MainPage;
