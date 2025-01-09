import React, { useState, useEffect } from "react";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function ReviewPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/reviews")
            .then(response => response.json())
            .then(data => setReviews(data));
    }, []);

    function handleReviewSubmitted(newReview) {
        setReviews(function (prevReviews) {
            return [...prevReviews, newReview];
        });
    }

    return (
        <div>
            <h2>All Reviews</h2>
            <ReviewList reviews={reviews} />
            <h2>Leave Your Review:</h2>
            <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
}

export default ReviewPage;
