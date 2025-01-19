package com.example.Backend.controllers;

import com.example.Backend.DTO.ScoreInfoDTO;
import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping("/getTopScores")
    public List <ScoreInfoDTO> getTopScores(){
        int topX = 10;
        return userProfileRepository.findAllSortedByScoreDTO(PageRequest.of(0, topX));
    }

    @GetMapping("/getAllScores")
    public List <UserProfile> getAllScores(){
        return userProfileRepository.findAllSortedByScore(); //This displays all user profiles as sorted by score
    }



}
