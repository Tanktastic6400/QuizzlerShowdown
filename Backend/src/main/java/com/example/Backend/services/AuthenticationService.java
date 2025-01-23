package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {

        Long userId = (Long) session.getAttribute(userSessionKey);

        if (userId == null) {
            return null;
        }
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        if (user.isEmpty()) {
            return null;
        }
        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    public boolean loginUser(String typedUsername, String typedPassword, HttpSession session){
        User attemptedUser = userRepository.findByUsername(typedUsername);
        if(attemptedUser == null){
            return false;
        }

        if(!attemptedUser.checkMatchingPasswords(typedPassword)){
            return false;
        }

        setUserInSession(session, attemptedUser);
        return true;
    }

    public boolean registerUser(User newUser, String passwordVerification){
        User oldUserName = userRepository.findByUsername(newUser.getUsername());
        User oldUserEmail = userRepository.findByEmail(newUser.getEmail());

        if(oldUserName != null || oldUserEmail != null){
            return false;
        }

        if(!newUser.checkMatchingPasswords(passwordVerification)){
            return false;
        }

        userRepository.save(newUser);

        return true;
    }

}
