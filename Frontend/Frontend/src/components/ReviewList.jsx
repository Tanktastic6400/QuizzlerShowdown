import React, { useEffect, useState } from "react";

const ReviewList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/reviews");
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            <h2>All Reviews</h2>
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
