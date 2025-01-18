package com.example.Backend.controllers;

import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/scoreservice")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ScoreController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    //WiP
    @PostMapping("/getScore")
    public ResponseEntity<String> getScore(HttpSession session, @RequestBody UserInfoDTO request){
        //Get the given user from the database via their ID
        Optional<User> scoreUser = userRepository.findById(request.getId());
        //userProfileRepository
        return ResponseEntity.ok("FILLER");
    }

    //This actually gets all profiles, but we do want to display other info as well...
    @GetMapping("/getAllScores")
    public List <UserProfile> getAllScores()
    {
        //System.out.println("INSIDE HERE");
        //List <UserProfile> userProfiles = userProfileRepository.findAll();
        //System.out.println(userProfiles);
        //System.out.println("PAST HERE");
        //return userProfiles;
        return userProfileRepository.findAll();
    }



}
