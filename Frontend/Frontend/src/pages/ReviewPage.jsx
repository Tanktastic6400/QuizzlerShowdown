import React, { useState } from "react";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

function ReviewPage() {
    const [reviews, setReviews] = useState([]);

    function handleReviewSubmitted(newReview) {
        setReviews(function(prevReviews) {
            return [...prevReviews, newReview];
        });
    }

    return (
        <div>
            <ReviewList />
            <h2>Leave Your Review</h2>
            <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
}

export default ReviewPage;
