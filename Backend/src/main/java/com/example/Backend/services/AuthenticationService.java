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

    @Autowired
    private UserService userService;

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

    //TODO Maybe actually do something with the email. ^^;
    public boolean loginUser(String typedLoginMethod, String typedPassword, HttpSession session){

        Optional<User> attemptedUser;

        if(typedLoginMethod.contains("@")) {
            attemptedUser = userService.getUserByEmail(typedLoginMethod);
        }
        else {
           attemptedUser = userService.getUserByUsername(typedLoginMethod);
        }

        if(attemptedUser.isEmpty()){
            return false;
        }

        User attemptedUserPassCheck = attemptedUser.get();

        if(!attemptedUserPassCheck.checkMatchingPasswords(typedPassword)){
            return false;
        }

        //if(!attemptedUserPassCheck.getEmail().equals(typedEmail)) {
        //    return false;
        //}

        setUserInSession(session, attemptedUserPassCheck);
        return true;
    }

    public boolean registerUser(User newUser, String passwordVerification){
        Optional <User> oldUserName = userService.getUserByUsername(newUser.getUsername());
        Optional <User> oldUserEmail = userService.getUserByEmail(newUser.getEmail());

        if(oldUserName.isPresent()|| oldUserEmail.isPresent()){
            return false;
        }

        if(!newUser.checkMatchingPasswords(passwordVerification)){
            return false;
        }

        userRepository.save(newUser);

        return true;
    }

}
