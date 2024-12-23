package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    public void loginUser(String typedUsername, String typedPassword){
        User attemptedUser = userRepository.findByUsername(typedUsername);
        if(attemptedUser == null){
            throw new RuntimeException("User does not exist");
        }

        if(!attemptedUser.checkMatchingPasswords(typedPassword)){
            throw new RuntimeException("Passwords do not match");
        }
    }

    public void registerUser(User newUser, String passwordVerification){
        User oldUser = userRepository.findByUsername(newUser.getUsername());
        if(oldUser != null){
            throw new RuntimeException("User already exists");
        }

        if(!newUser.checkMatchingPasswords(passwordVerification)){
            throw new RuntimeException("Passwords do not match");
        }

        userRepository.save(newUser);
    }

}
