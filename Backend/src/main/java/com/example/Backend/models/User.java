package com.example.Backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users")
public class User extends AbstractClass {
    private String username;
    private String email;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private UserProfile userProfile;

    //Added encoder
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(){}

    public User(String username, String email, String password) {
        
        this.username = username;
        this.email = email;
        this.password = encoder.encode(password);
        this.userProfile = new UserProfile();
    }

    public User(Long senderId) {
        super();
    }

    public String getUsername() {
        return username;
    }

    //Do we need a setter for this? Want folks to be able to change their account's username?
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    //See comment about setUsername.
    public void setEmail(String email) {
        this.email = email;
    }

    //Compares to see if hashes are the same.
    public boolean checkMatchingPasswords(String password){
        return encoder.matches(password, this.password);
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }
}
