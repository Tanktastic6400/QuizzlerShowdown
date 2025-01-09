import React, { useState } from "react";

function ReviewForm(props) {
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    const reviewData = {
      reviewDescription: reviewDescription,
      rating: rating,
      username: username || "Anonymous",
      createdAt: currentDate,
    };

    fetch("http://localhost:8080/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        return response.json();
      })
      .then(function (savedReview) {
        props.onReviewSubmitted(savedReview);
        setReviewDescription("");
        setRating(0);
        setUsername("");
      })
      .catch(function (error) {
        console.error("Error submitting review:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Your Name (Optional)
        </label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={function (e) {
            setUsername(e.target.value);
          }}
          placeholder="Your Name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reviewDescription" className="form-label">
          Review Description
        </label>
        <textarea
          className="form-control"
          value={reviewDescription}
          onChange={function (e) {
            setReviewDescription(e.target.value);
          }}
          placeholder="Write your review"
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <select
          className="form-select"
          value={rating}
          onChange={function (e) {
            setRating(parseInt(e.target.value));
          }}
          required
        >
          <option value="0">0 - Bad</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Okay</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
