package com.example.Backend.controllers;
import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import com.example.Backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Backend.models.data.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userservice") //74?
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/updateScore")
    public ResponseEntity<String> attemptUpdateScore(@RequestParam User user, @RequestParam int score){

//        //JUST A TEST PLACEHOLDER
//        public ResponseEntity<String> attemptUpdateScore(){
//        //HARDCORED PLACEHOLDRS FOR NOW
//        Long doubleId = (long) 15;
//        int score = 49000;
//
//        //System.out.println("SCORE");
//        //System.out.println(score);
//        //System.out.println("SCORE");
//
//        //This is all just for pulling up a user for testing. Ugh.
//        User user;
//        if(userRepository.findById(doubleId).isPresent()){
//            user = userRepository.findById(doubleId).get();
//        } else
//            return ResponseEntity.status(401).body("User not found");
//
        UserProfile profileToUpdate = user.getUserProfile();
//
//        System.out.println("TRYING TO GET USER INFO FROM USER PROFILE");
//        System.out.println(profileToUpdate.getUser().getUsername());
//        System.out.println("DID WE GET IT?");


        profileToUpdate.setScore(score);
        userService.updateUserProfile(profileToUpdate);
        return ResponseEntity.ok("Score updated");
    }

    //Add some checks here in the event of error for some reason?
    @PostMapping("/deleteAccount")
    public ResponseEntity<String> attemptDeletion(HttpSession session){

        User deletedUser = authenticationService.getUserFromSession(session);
        userService.deleteUser(deletedUser);
        session.invalidate();
        return ResponseEntity.ok("Account deleted");
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDTO> getUserInfo(HttpSession session){

        User currentUser= authenticationService.getUserFromSession(session);

        UserInfoDTO userInfo = new UserInfoDTO();

        if(currentUser == null){
            //Return the empty DTO, but since the error code is 401 it won't ever be used?
            return ResponseEntity.status(401).body(userInfo);
        }
        String currentUsername = currentUser.getUsername();

        userInfo.setId(currentUser.getId());
        userInfo.setUsername(currentUser.getUsername());
        userInfo.setEmail(currentUser.getEmail());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/lookUpUserByProfile")
    public ResponseEntity<UserInfoDTO> lookUpUserByProfile(@RequestParam long profileID){


        UserInfoDTO userInfo = new UserInfoDTO();
        User lookedUpUser;

        //This works because User and UserProfile always share the same ID
        if(userProfileRepository.findById(profileID).isPresent()){
            lookedUpUser = userRepository.findById(profileID);
        } else
            return ResponseEntity.status(401).body(userInfo);

        //Can set more properties if needed
        userInfo.setUsername(lookedUpUser.getUsername());

        return ResponseEntity.ok(userInfo);
    }

}
