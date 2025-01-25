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
        Long user1Id = request.getUser1Id();
        Long user2Id = request.getUser2Id();
        System.out.println("FriendDTO info - user1Id: " + user1Id + "user2Id: " + user2Id);
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


    //commented out below to verify that it is not needed. Search user is handling now.


//    @GetMapping("/findfriends")
//    public ResponseEntity<List<User>> findFriends(@RequestParam String username) {
//
//        try {
//            List<User> friends = friendListService.findUser(username);
//            if (friends.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                        .body(Collections.emptyList());
//            }
//            return ResponseEntity.ok(friends);
//        } catch (Exception e) {
//            System.err.println("Error in finding friends: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Collections.emptyList());
//        }
//    }
}
