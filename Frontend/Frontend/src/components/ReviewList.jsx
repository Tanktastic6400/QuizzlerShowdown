import React from "react";
import "../styles/App.css";

const ReviewList = ({ reviews }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        {reviews.map((review) => (
          <div className="col-12 mb-4" key={review.id}>
            <div className="card h-100 custom-cards">
              <div className="card-body">
                <h5 className="card-title">{review.username || "Anonymous"}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Rating: {review.rating} / 5
                </h6>
                <p className="card-text">{review.reviewDescription}</p>
              </div>
              <div className="card-footer text-muted">
                Submitted on: {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
