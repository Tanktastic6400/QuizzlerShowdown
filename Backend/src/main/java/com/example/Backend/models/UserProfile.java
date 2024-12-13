package com.example.Backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class UserProfile extends AbstractClass {

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    private int score;



}
