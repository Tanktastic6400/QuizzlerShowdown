package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user_profiles")
public class UserProfile extends AbstractClass {

    //IRENA ORIGINAL
    //@OneToOne //(cascade = CascadeType.ALL) //cascade type addition by me to try to get this thing working finally. ^^;
    //@JoinColumn(name = "user_id")

    //KEITH SUGGESTION
    //@OneToOne
    //@JsonBackReference

    //MINE CHANGE!!???

    @OneToOne(mappedBy = "userProfile")
    @JsonBackReference //Avoid infinite recursion
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
