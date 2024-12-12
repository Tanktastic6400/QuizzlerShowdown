package com.example.Backend.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class FriendList extends AbstractEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")  // This will reference the user who owns the friend list
    private User user;

    @ManyToMany
    @JoinTable(
            name = "friendship",  // This will be the join table
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private Set<User> friends;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getFriends() {
        return friends;
    }

    public void setFriends(Set<User> friends) {
        this.friends = friends;
    }
}
