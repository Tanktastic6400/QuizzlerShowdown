package com.example.Backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "answered_questions")
public class AnsweredQuestion extends AbstractClass {


    @ManyToOne
    @JoinColumn(name = "user_profile_id", nullable = false)
    @JsonBackReference
    private UserProfile userProfile;

    @Column(nullable = false)
    private String questionText;

    @Column(nullable = false)
    private boolean isCorrect;

    private int pointsEarned;

    public AnsweredQuestion() {}

    public AnsweredQuestion(UserProfile userProfile, String questionText, boolean isCorrect, int pointsEarned) {
        this.userProfile = userProfile;
        this.questionText = questionText;
        this.isCorrect = isCorrect;
        this.pointsEarned = pointsEarned;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public int getPointsEarned() {
        return pointsEarned;
    }

    public void setPointsEarned(int pointsEarned) {
        this.pointsEarned = pointsEarned;
    }
}
