package com.example.Backend.models;

import jakarta.persistence.Entity;

@Entity
public class Review extends AbstractClass {
    private String reviewDescription;

    public Review(String reviewDescription) {
        this.reviewDescription = reviewDescription;
    }

    public Review() {}

    public String getReviewDescription() {
        return reviewDescription;
    }

    public void setReviewDescription(String reviewDescription) {
        this.reviewDescription = reviewDescription;
    }
}
