package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {

        System.out.println("INSIDE GET USER FROM SESSIONS");

        Long userId = (Long) session.getAttribute(userSessionKey);

        System.out.println(userId);

        if (userId == null) {
            System.out.println("INSIDE NULL USER ID");
            return null;
        }
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        if (user.isEmpty()) {
            System.out.println("INSIDE NO USER ID FOUND");
            return null;
        }
        //return user.get();
        System.out.println("AT GET USER FROM SESSION RETURN");
        System.out.println(user.get());
        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

    public boolean loginUser(String typedUsername, String typedPassword, HttpSession session){
        User attemptedUser = userRepository.findByUsername(typedUsername);
        if(attemptedUser == null){
            return false;
            //throw new RuntimeException("User does not exist");
        }

        if(!attemptedUser.checkMatchingPasswords(typedPassword)){
            return false;
            //throw new RuntimeException("Passwords do not match");
        }

        System.out.println(attemptedUser.getUsername());
        setUserInSession(session, attemptedUser);
        //session.invalidate(); //This is just for testing
        System.out.println(getUserFromSession(session).getUsername());
        return true;
    }

    public boolean registerUser(User newUser, String passwordVerification){
        User oldUserName = userRepository.findByUsername(newUser.getUsername());
        User oldUserEmail = userRepository.findByEmail(newUser.getEmail());

        if(oldUserName != null || oldUserEmail != null){
            return false;
            //throw new RuntimeException("User already exists");
        }

        if(!newUser.checkMatchingPasswords(passwordVerification)){
            return false;
            //throw new RuntimeException("Passwords do not match");
        }

        userRepository.save(newUser);
        return true;
    }

}
