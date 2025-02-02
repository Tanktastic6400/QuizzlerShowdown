import React, { useState, useEffect } from "react";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function ReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(function () {
        fetch("http://localhost:8080/api/reviews", { credentials: "include" })
            .then(function (response) { 
                return response.json();
            })
            .then(function (data) { 
                setReviews(data);
            });
    }, []);
    
    useEffect(function () {
        fetch("http://localhost:8080/authenticationservice/userinfo", { credentials: "include" })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Not logged in");
                }
                return response.json();
            })
            .then(function (user) {
                setCurrentUser(user);
            })
            .catch(function () { 
                setCurrentUser(null);
            });
    }, []);
    
    function handleReviewSubmitted(newReview) {
        setReviews(function (prevReviews) {
            return [...prevReviews, newReview];
        });
    }

    return (
        <div className="main-content">
            <h2>All Reviews</h2>
            <ReviewList reviews={reviews} />
            <h2>Leave Your Review:</h2>
            <ReviewForm onReviewSubmitted={handleReviewSubmitted}  currentUser={currentUser} />
        </div>
    );
}

export default ReviewPage;
