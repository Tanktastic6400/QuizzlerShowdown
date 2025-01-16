package com.example.Backend.controllers;

import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/search/users")
    public List<User> searchUsers(@RequestParam String username) {
        return userRepository.findByUsernameContaining(username);
    }
}
