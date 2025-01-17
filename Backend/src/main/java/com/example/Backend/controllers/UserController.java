package com.example.Backend.controllers;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
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

    @PostMapping("/updateScore")
    //public ResponseEntity<String> attemptUpdateScore(@RequestParam User user, @RequestParam int score){

        //JUST A TEST PLACEHOLDER
        public ResponseEntity<String> attemptUpdateScore(){
        //HARDCORED PLACEHOLDRS FOR NOW
        Long doubleId = (long) 1;
        int score = 500;

        //System.out.println("SCORE");
        //System.out.println(score);
        //System.out.println("SCORE");

        //This is all just for pulling up a user for testing. Ugh.
        User user;
        if(userRepository.findById(doubleId).isPresent()){
            user = userRepository.findById(doubleId).get();
        } else
            return ResponseEntity.status(401).body("User not found");

        UserProfile profileToUpdate = user.getUserProfile();
        profileToUpdate.setScore(score);
        userService.updateUserProfile(profileToUpdate);
        return ResponseEntity.ok("Score update");
    }



    //Add some checks here in the event of error for some reason?
    @PostMapping("/deleteAccount")
    public ResponseEntity<String> attemptDeletion(HttpSession session){

        User deletedUser = authenticationService.getUserFromSession(session);
        userService.deleteUser(deletedUser);
        session.invalidate();
        return ResponseEntity.ok("Account deleted");
    }

}
