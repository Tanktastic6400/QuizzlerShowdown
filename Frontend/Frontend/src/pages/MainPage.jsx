import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import UserSearch from "../components/UserSearch";

const MainPage = () => {
    const navigate = useNavigate();
    const handleReviewButtonClick = () => {
        navigate('/reviews');
    }
    return (

        // <div className="main-page-container">
        //         <h1>Welcome to Quizzler Showdown</h1>
        //         <div className="position-fixed top-0 end-0 p-3">
        <div>
            <UserSearch />
            <div className="review-button-position">
            <button
                className="btn btn-primary float-end mt-5"
                onClick={handleReviewButtonClick}
            >
                <span className="me-2">Reviews</span>
                <span className="text-warning">★★★★★</span>
            </button>
            </div>
        </div>


        //  </div>
    );
};

export default MainPage;
