package com.example.Backend.controllers;
import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import com.example.Backend.services.ChatService;
import com.example.Backend.services.FriendListService;
import com.example.Backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Backend.models.data.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.DTO.ProfileFormDTO;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    @Autowired
    private FriendListService friendListService;

    @Autowired
    private ChatService chatService;

    @GetMapping("/search/users")
    public List<User> searchUsers(@RequestParam String username) {
        return userRepository.findByUsernameContaining(username);
    }

    //AS IS THIS IS GET USER INFO BUT BY PROFILE NAME INSTEAD OF JUST THE LOGGED-IN USER VIA SESSION
    @GetMapping("/findUser")
    public ResponseEntity<UserInfoDTO> attemptFindUser(@RequestParam String username){
        UserInfoDTO userInfo = new UserInfoDTO();
        Optional <User> tryFindUser = userService.getUserByUsername(username);
        if(tryFindUser.isEmpty()){
            return ResponseEntity.status(401).body(userInfo);
        }
        User foundUser = tryFindUser.get();
        userInfo.setId(foundUser.getId());
        userInfo.setUsername(foundUser.getUsername());
        userInfo.setEmail(foundUser.getEmail());
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/findProfile")
    public ResponseEntity<ProfileFormDTO> attemptFindProfile(@RequestParam long id){
        ProfileFormDTO profileForm = new ProfileFormDTO();
        User profileUser = userService.getUserByID(id);
        profileForm.setBio(profileUser.getUserProfile().getBio());
        profileForm.setName(profileUser.getUserProfile().getName());
        profileForm.setLocation(profileUser.getUserProfile().getLocation());
        profileForm.setOccupation(profileUser.getUserProfile().getOccupation());
        profileForm.setScore(profileUser.getUserProfile().getScore());
        profileForm.setQuizzesTaken(profileUser.getUserProfile().getQuizzesTaken());
        profileForm.setQuestionsAnswered(profileUser.getUserProfile().getQuestionsAnswered());
        profileForm.setTotalCorrectAnswers(profileUser.getUserProfile().getTotalCorrectAnswers());
        profileForm.setCorrectAnswerPercentage(profileUser.getUserProfile().getCorrectAnswerPercentage());
        profileForm.setLevel(profileUser.getUserProfile().getLevel());
        return ResponseEntity.ok(profileForm);
        //return ResponseEntity.ok(testBio);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<String> attemptUpdateProfile(@RequestBody ProfileFormDTO request){
        Optional <User> tryFindUser = userService.getUserByUsername(request.getUsername());
        if(tryFindUser.isEmpty()){
            return ResponseEntity.status(401).body("Error, could not update profile");
        }
        UserProfile profiletoUpdate = tryFindUser.get().getUserProfile();
        profiletoUpdate.setName(request.getName());
        profiletoUpdate.setBio(request.getBio());
        profiletoUpdate.setLocation(request.getLocation());
        profiletoUpdate.setOccupation(request.getOccupation());
        userService.updateUserProfile(profiletoUpdate);
        return ResponseEntity.ok("Profile fields updated");
    }

    @PostMapping("/updateScore")
    public ResponseEntity<String> attemptUpdateScore(@RequestParam long  ID, @RequestParam int score, @RequestParam boolean add, @RequestParam int correctAnswers, @RequestParam int numberOfQuestions ){
        User user = userService.getUserByID(ID);
        UserProfile profileToUpdate = user.getUserProfile();
        userService.updateStats(profileToUpdate, correctAnswers, numberOfQuestions, score, add);
        return ResponseEntity.ok("Score updated");
    }

    //Add some checks here in the event of error for some reason?
    @PostMapping("/deleteAccount")
    public ResponseEntity<String> attemptDeletion(HttpSession session){
        User deletedUser = authenticationService.getUserFromSession(session);
        long id = deletedUser.getId();
        chatService.clearMessages(id);
        chatService.clearChats(id);
        friendListService.clearFriends(id);
        userService.deleteUser(deletedUser);
        session.invalidate();
        return ResponseEntity.ok("Account deleted");
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDTO> getUserInfo(HttpSession session){
        User currentUser= authenticationService.getUserFromSession(session);
        UserInfoDTO userInfo = new UserInfoDTO();
        currentUser.getUserProfile().getScore();
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
            lookedUpUser = userService.getUserByID(profileID);
            //lookedUpUser = userRepository.findById(profileID);
        } else
            return ResponseEntity.status(401).body(userInfo);

        //Can set more properties if needed
        userInfo.setUsername(lookedUpUser.getUsername());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/searchusers")
    public ResponseEntity<List<User>> findUser(@RequestParam String username){
        try {
            List<User> friends = userService.findUser(username);
            if (friends.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.emptyList());
            }
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            System.err.println("Error in finding friends: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
    
}
