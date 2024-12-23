package com.example.Backend.models;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Chat extends AbstractClass {

    private String chatId;

    public Chat() {}

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Chat(User sender, User receiver, LocalDateTime createdAt, String chatId) {
        this.sender = sender;
        this.receiver = receiver;
        this.createdAt = createdAt;
        this.chatId = chatId;
    }


    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
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
