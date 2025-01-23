package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;


    public User getUserByID(long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("No user with ID found"));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUserProfile(UserProfile userProfile){
        userProfileRepository.save(userProfile);
        //userProfileRepository.
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    //I feel like there should be some kind of check here to make sure the user exists.
    public void deleteUser(User user){
        userRepository.deleteById(user.getId());
    }

    public List<User> findUser(String username) {
        return userRepository.findByUsernameContaining(username); // Adjust repository method as needed
    }
}
