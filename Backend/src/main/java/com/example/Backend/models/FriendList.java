package com.example.Backend.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FriendList extends AbstractClass {


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")  // This will reference the user who owns the friend list
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "friendship",  // This will be the join table
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private User friend;

    @Enumerated(EnumType.STRING)
    private FriendStatus status = FriendStatus.PENDING;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public FriendList(User user, User friend, FriendStatus status, LocalDateTime createdAt) {
        this.user = user;
        this.friend = friend;
        this.status = status;
        this.createdAt = createdAt;
    }

    public FriendList() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getFriends() {
        return friend;
    }

    public void setFriends(User friend) {
        this.friend = friend;
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
}
