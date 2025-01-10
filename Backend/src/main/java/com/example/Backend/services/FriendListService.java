package com.example.Backend.services;

import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import com.example.Backend.models.User;
import com.example.Backend.models.data.FriendListRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendListService {
    @Autowired
    FriendListRepository friendListRepository;

    @Autowired
    private UserRepository userRepository;

    public List<FriendList> getFriends(Long userId) {
        return friendListRepository.findByUserId(userId);
    }

    public void sendFriendRequest(Long userId, Long friendId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));
        FriendList friendlist = new FriendList();
        friendlist.setUser(user);
        friendlist.setFriends(friend);
        friendlist.setRequestId(userId.toString()+"-"+friendId.toString());
        friendlist.setStatus(FriendStatus.PENDING);
        friendListRepository.save(friendlist);
    }

//    public void respondToRequest(Long friendshipId, FriendStatus status) {
//        FriendList friendlist = friendListRepository.findById(friendshipId).orElseThrow();
//        friendlist.setStatus(status);
//        friendListRepository.save(friendlist);
//    }

    public void respondToRequest(String requestId, FriendStatus status) {
        FriendList friendlist = friendListRepository.findByRequestId(requestId);
        friendlist.setStatus(status);
        friendListRepository.save(friendlist);
    }

    public List<User> findUser(String username) {
        return userRepository.findByUsernameContaining(username); // Adjust repository method as needed
    }
}
