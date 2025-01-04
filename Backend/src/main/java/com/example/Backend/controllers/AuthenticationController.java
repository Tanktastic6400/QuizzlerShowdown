package com.example.Backend.controllers;


import com.example.Backend.DTO.LoginFormDTO;
import com.example.Backend.DTO.RegisterFormDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/authenticationservice") //74?
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<String> attemptLogin(@RequestBody LoginFormDTO request, HttpSession session){
        String typedName = request.getUsername();
        String typedPassword = request.getPassword();
        if(authenticationService.loginUser(typedName, typedPassword, session)){
            return ResponseEntity.ok("Sucessfully logged in");
        }
        //setUserInSession(request.getSession(), theUser);
        return ResponseEntity.status(401).body("Incorrect username or password");
    }

    @PostMapping("/register")
    public ResponseEntity<String> attemptRegistration(@RequestBody RegisterFormDTO request){
        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        String passwordCheck = request.getPasswordVerification();
        if(authenticationService.registerUser(newUser, passwordCheck)) {
            return ResponseEntity.ok("Sucessfully registered");
        }
        return ResponseEntity.status(401).body("Incorrect registration information");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> attemptLogout(HttpSession session) {
        System.out.println("GOT IN HERE");
        session.invalidate();
        return ResponseEntity.ok("Successfully logged out");
    }


}
