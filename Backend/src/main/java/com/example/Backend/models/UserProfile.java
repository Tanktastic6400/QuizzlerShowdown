package com.example.Backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user_profiles")
public class UserProfile extends AbstractClass {


    //@OneToOne
    //@JoinColumn(name = "user_id")
    @OneToOne(mappedBy = "userProfile")
    private User user;

    private int score = 0; //Have score start at 0?
    //private int score;

    @OneToMany(mappedBy = "userProfile")
    private List<AnsweredQuestion> answeredQuestions;

    public UserProfile() {}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<AnsweredQuestion> getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(List<AnsweredQuestion> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }
}
