package com.example.Backend.controllers;

import com.example.Backend.DTO.FriendRequestDTO;
import com.example.Backend.DTO.RespondRequestDTO;
import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import com.example.Backend.services.FriendListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
