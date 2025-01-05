package com.example.Backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.*;

@Entity
public class Message extends AbstractClass {

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "sender_id", nullable = true)
    private User sender;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "recipient_id", nullable = true)
    private User recipient;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String timestamp;

    private String chatId;

    public Message(User sender, User recipient, String content, String timestamp, String chatId) {
        this.sender = sender;
        this.recipient = recipient;
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

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
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
                "sender=" + sender +
                ", recipient=" + recipient +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", chatId='" + chatId + '\'' +
                '}';
    }
}
