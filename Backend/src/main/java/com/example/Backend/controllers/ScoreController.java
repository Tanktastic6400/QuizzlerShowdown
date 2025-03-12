package com.example.Backend.controllers;

import com.example.Backend.DTO.ScoreInfoDTO;
import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.UserService;
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

    @Autowired
    private UserService userService;

    @GetMapping("/getScore/{id}")
    public ResponseEntity<Integer> getScore(HttpSession session, @PathVariable long id){
        int scoreUser = userService.getUserByID(id).getUserProfile().getScore();
        return ResponseEntity.ok(scoreUser);
    }

    @GetMapping("/getTopScores")
    public List <ScoreInfoDTO> getTopScores(){
        int topX = 10;
        return userProfileRepository.findAllSortedByScoreDTO(PageRequest.of(0, topX));
    }

    @GetMapping("/getAllScores")
    public ResponseEntity<List<ScoreInfoDTO>> getAllScores(){
        // Define the page size or limit if required, or fetch all records if pagination is not necessary
        PageRequest pageRequest = PageRequest.of(0, Integer.MAX_VALUE); // Example to fetch a large set of records
        List<ScoreInfoDTO> scores = userProfileRepository.findAllSortedByScoreDTO(pageRequest);
        if (scores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(scores);
    }


}
