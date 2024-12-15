package com.example.Backend.controllers;


import com.example.Backend.DTO.RegisterFormDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public void attemptRegistration(@RequestBody RegisterFormDTO request){
        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        String passwordCheck = request.getPasswordVerification();
        authenticationService.registerUser(newUser, passwordCheck);
        //setUserInSession(request.getSession(), newUser);
    }


}
