package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.*;

@Entity

public class Message extends AbstractClass {

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sender_id", nullable = true)
    private User user1;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "recipient_id", nullable = true)
    private User user2;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String timestamp;

    private String chatId;

    public Message(User user1, User user2, String content, String timestamp, String chatId) {
        this.user1 = user1;
        this.user2 = user2;
        this.content = content;
        this.timestamp = timestamp;
        this.chatId = chatId;
    }

    public Message() {
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Message{" +
                "sender=" + user1 +
                ", recipient=" + user2 +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", chatId='" + chatId + '\'' +
                '}';
    }
}
