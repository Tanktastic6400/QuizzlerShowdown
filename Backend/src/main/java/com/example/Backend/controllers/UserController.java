package com.example.Backend.controllers;

import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import com.example.Backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userservice") //74?
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/deleteAccount")
    public ResponseEntity<String> attemptDeletion(HttpSession session){

        User deletedUser = authenticationService.getUserFromSession(session);
        userService.deleteUser(deletedUser);
        session.invalidate();
        return ResponseEntity.ok("Account deleted");
    }

}
