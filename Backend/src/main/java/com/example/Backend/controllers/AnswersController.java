package com.example.Backend.controllers;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class AnswersController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserProfileRepository profileRepo;


    @PostMapping("/answers")
    public void updateScore(@RequestParam String username){
//       User user = userRepo.findByUsername(username); //Commented this out because of refactoring of userRepo.findByUsername
       UserProfile profile;
//       if(){

//       }



    }



}
