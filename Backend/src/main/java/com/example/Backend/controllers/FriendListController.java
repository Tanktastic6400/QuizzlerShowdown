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
    public void respondToFriendRequest(@RequestBody RespondRequestDTO request) {
        Long friendshipId = request.getFriendshipId();
        String status = request.getStatus();
        FriendStatus friendshipStatus = FriendStatus.valueOf(status.toUpperCase());
        friendListService.respondToRequest(friendshipId, friendshipStatus);
    }

//    @GetMapping("/findfriends")
//    public void findFriends(@RequestParam String username){
//        System.out.println("user search from controller");
//        friendListService.findUser(username);
//    }

    @GetMapping("/findfriends")
    public ResponseEntity<List<User>> findFriends(@RequestParam String username) {
        System.out.println("User search from controller: " + username);

        try {
            List<User> friends = friendListService.findUser(username); // Assume this returns a list of users
            if (friends.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.emptyList()); // Return 404 with empty list if no users found
            }
            return ResponseEntity.ok(friends); // Return 200 with the list of users
        } catch (Exception e) {
            System.err.println("Error in finding friends: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList()); // Return 500 in case of error
        }
    }
}
