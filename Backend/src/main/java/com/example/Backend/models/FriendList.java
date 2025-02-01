package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FriendList extends AbstractClass {


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user1_id", nullable = true)
    private User user1;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user2_id", nullable = true)
    private User user2;

    @Enumerated(EnumType.STRING)
    private FriendStatus status = FriendStatus.PENDING;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = true)
    private String requestId;

    public FriendList(User user1, User user2, FriendStatus status, LocalDateTime createdAt, String requestId) {
        this.user1 = user1;
        this.user2 = user2;
        this.status = status;
        this.createdAt = createdAt;
        this.requestId = requestId;
    }

    public FriendList() {
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

    public FriendStatus getStatus() {
        return status;
    }

    public void setStatus(FriendStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }
}
