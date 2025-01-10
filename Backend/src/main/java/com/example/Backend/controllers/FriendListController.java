package com.example.Backend.controllers;

import com.example.Backend.DTO.FriendRequestDTO;
import com.example.Backend.DTO.RespondRequestDTO;
import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import com.example.Backend.models.User;
import com.example.Backend.services.FriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/friendlist")
public class FriendListController {
    @Autowired
    private FriendListService friendListService;

    @GetMapping("/{userId}")
    public List<FriendList> getFriends(@PathVariable Long userId) {
        return friendListService.getFriends(userId);
    }

    @PostMapping("/send-request")
    public void sendFriendRequest(@RequestBody FriendRequestDTO request) {
        Long userId = request.getUserId();
        Long friendId = request.getFriendId();
        friendListService.sendFriendRequest(userId, friendId);
    }
    
    @PostMapping("/respond-request")
    public ResponseEntity<String> respondToFriendRequest(@RequestBody RespondRequestDTO request) {

        try {
            String requestId = request.getRequestId();
            String status = request.getStatus();

            // Validate status
            FriendStatus friendshipStatus;
            try {
                friendshipStatus = FriendStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status: " + status);
            }
            System.out.println("friendshipid: " + request.getRequestId());
            // Update the friend request
            friendListService.respondToRequest(requestId, friendshipStatus);
            return ResponseEntity.ok("Friend request updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @GetMapping("/findfriends")
    public ResponseEntity<List<User>> findFriends(@RequestParam String username) {

        try {
            List<User> friends = friendListService.findUser(username);
            if (friends.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.emptyList());
            }
            return ResponseEntity.ok(friends);
        } catch (Exception e) {
            System.err.println("Error in finding friends: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList()); // Return 500 in case of error
        }
    }
}
