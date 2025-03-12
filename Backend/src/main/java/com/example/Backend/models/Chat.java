package com.example.Backend.models;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Chat extends AbstractClass {

    private String chatId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sender_id", nullable = true)
    private User user1;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "receiver_id", nullable = true)
    private User user2;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Chat(User user1, User user2, LocalDateTime createdAt, String chatId) {
        this.user1 = user1;
        this.user2 = user2;
        this.createdAt = createdAt;
        this.chatId = chatId;
    }

    public Chat() {}

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }
}
