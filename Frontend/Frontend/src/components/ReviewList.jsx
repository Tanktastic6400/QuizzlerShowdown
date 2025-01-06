import React from "react";

const ReviewList = ({reviews}) => {
    return (
        <div>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p><strong>{review.username || "Anonymous"}:</strong> {review.reviewDescription}</p>
                        <p>Rating: {review.rating} / 5</p>
                        <p>Submitted on: {new Date(review.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReviewList;
