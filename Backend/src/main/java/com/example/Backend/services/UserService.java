package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    public void updateUser(User user) {
        userRepository.save(user);
    }

    //I feel like there should be some kind of check here to make sure the user exists.
    public void deleteUser(User user){
        userRepository.deleteById(user.getId());
    }

}
