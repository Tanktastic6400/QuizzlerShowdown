package com.example.Backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Chat extends AbstractClass {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String content;

    public Chat() {}

    public User getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
