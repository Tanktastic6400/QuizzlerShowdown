package com.example.Backend.controllers;


import com.example.Backend.DTO.LoginFormDTO;
import com.example.Backend.DTO.RegisterFormDTO;
import com.example.Backend.DTO.UserInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticationservice") //74?
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<String> attemptLogin(@RequestBody LoginFormDTO request, HttpSession session){
        String typedLoginMethod = request.getUsername();
        String typedPassword = request.getPassword();
        if(authenticationService.loginUser(typedLoginMethod, typedPassword, session)){
            return ResponseEntity.ok("Sucessfully logged in");
        }
        return ResponseEntity.status(401).body("Incorrect username/email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<String> attemptRegistration(@RequestBody RegisterFormDTO request){
        if(request.getUsername().contains("@")) {
            return ResponseEntity.status(401).body("Username cannot contain @");
        }
        User newUser = new User(request.getUsername(), request.getEmail(), request.getPassword());
        String passwordCheck = request.getPasswordVerification();
        if(!authenticationService.checkUsername(newUser)){
            return ResponseEntity.status(401).body("Username already in use");
        }
        if(!authenticationService.checkEmail(newUser)) {
            return ResponseEntity.status(401).body("Email already in use");
        }
        if(authenticationService.registerUser(newUser, passwordCheck)) {
            return ResponseEntity.ok("Successfully registered");
        }
        return ResponseEntity.status(401).body("Incorrect registration information");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> attemptLogout(HttpSession session) {
        //System.out.println("GOT IN HERE");
        session.invalidate();
        return ResponseEntity.ok("Successfully logged out");
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDTO> getUserInfo(HttpSession session){

        User currentUser= authenticationService.getUserFromSession(session);

        UserInfoDTO userInfo = new UserInfoDTO();

        if(currentUser == null){
            //Return the empty DTO, but since the error code is 401 it won't actually be used
            return ResponseEntity.status(401).body(userInfo);
        }
        String currentUsername = currentUser.getUsername();

        userInfo.setId(currentUser.getId());
        userInfo.setUsername(currentUser.getUsername());
        userInfo.setEmail(currentUser.getEmail());

        return ResponseEntity.ok(userInfo);
    }

}
