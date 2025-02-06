package com.example.Backend.services;

import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.Chat;
import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import com.example.Backend.models.User;
import com.example.Backend.models.data.FriendListRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FriendListService {
    @Autowired
    FriendListRepository friendListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatService chatService;

    public List<FriendList> getFriends(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        Long id = user.get().getId();

        return friendListRepository.findByUser1IdOrUser2Id(id, id);
    }

    public void clearFriends (Long userId) {
        List<FriendList> listToClear = getFriends(userId);
        for (FriendList friend : listToClear) {
            friendListRepository.deleteById(friend.getId());
        }
    }

    public void sendFriendRequest(Long userId, Long friendId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));
        FriendList friendlist = new FriendList();
        friendlist.setUser1(user);
        friendlist.setUser2(friend);
        friendlist.setRequestId(userId.toString()+"-"+friendId.toString());
        friendlist.setStatus(FriendStatus.PENDING);
        friendListRepository.save(friendlist);
    }

    public void respondToRequest(String requestId, FriendStatus status) {

        FriendList friendlist = friendListRepository.findByRequestId(requestId);
        Long friendId = friendlist.getUser2().getId();
        Long userId = friendlist.getUser1().getId();
        friendlist.setStatus(status);
        if(friendlist.getStatus() == FriendStatus.ACCEPTED) {
            chatService.getOrCreateChatId(userId, friendId);
        }
        friendListRepository.save(friendlist);
    }

    public List<User> findUser(String username) {
        return userRepository.findByUsernameContaining(username); // Adjust repository method as needed
    }
}
