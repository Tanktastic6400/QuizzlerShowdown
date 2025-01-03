package com.example.Backend.controllers;


import com.example.Backend.DTO.LoginFormDTO;
import com.example.Backend.DTO.RegisterFormDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    //private static final String userSessionKey = "user";

    //private static void setUserInSession(HttpSession session, User user) {
    //    session.setAttribute(userSessionKey, user.getId());
    //}

    @PostMapping("/login")
    public void attemptLogin(@RequestBody LoginFormDTO request){
        String typedName = request.getUsername();
        String typedPassword = request.getPassword();
        authenticationService.loginUser(typedName, typedPassword);
    }

    @PostMapping("/register")
    public void attemptRegistration(@RequestBody RegisterFormDTO request){
        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        String passwordCheck = request.getPasswordVerification();
        authenticationService.registerUser(newUser, passwordCheck);
        //setUserInSession(request.getSession(), newUser);
    }


}
