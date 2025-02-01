package com.example.Backend.controllers;

import com.example.Backend.DTO.FriendRequestDTO;
import com.example.Backend.DTO.RespondRequestDTO;
import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import com.example.Backend.models.User;
import com.example.Backend.services.FriendListService;
import com.example.Backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/friendlist")
public class FriendListController {
    @Autowired
    private FriendListService friendListService;

    @Autowired
    private UserService userService;

    @GetMapping("username")
    public List<FriendList>fetchFriendsFromName(@RequestParam String username){
        Optional<User> tryFindUser = userService.getUserByUsername(username);
        if(tryFindUser.isEmpty()) {
            try {
                throw new RuntimeException();
            } catch (RuntimeException e) {
                e.printStackTrace();
            }
        }
        long userId = tryFindUser.get().getId();
        return friendListService.getFriends(userId);
    }

    @GetMapping("/currentuser")
    public List<FriendList> fetchFriends(@RequestParam Long userId) {

        return friendListService.getFriends(userId);
    }

    @PostMapping("/send-request")
    public void sendFriendRequest(@RequestBody FriendRequestDTO request) {
        Long user1Id = request.getUser1Id();
        Long user2Id = request.getUser2Id();

        friendListService.sendFriendRequest(user1Id, user2Id);
    }

    @PostMapping("/respond-request")
    public ResponseEntity<String> respondToFriendRequest(@RequestBody RespondRequestDTO request) {

        try {
            String requestId = request.getRequestId();
            String status = request.getStatus();

            FriendStatus friendshipStatus;
            try {
                friendshipStatus = FriendStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status: " + status);
            }

            friendListService.respondToRequest(requestId, friendshipStatus);
            return ResponseEntity.ok("Friend request updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }



}
