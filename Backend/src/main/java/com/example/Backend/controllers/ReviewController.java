package com.example.Backend.controllers;

import com.example.Backend.models.Review;
import com.example.Backend.models.User;
import com.example.Backend.models.data.ReviewRepository;
import com.example.Backend.services.AuthenticationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review,  HttpSession session) {
        review.setCreatedAt(LocalDateTime.now());

        User loggedInUser = authenticationService.getUserFromSession(session);

        if (loggedInUser != null) {
            review.setUsername(loggedInUser.getUsername());
        } else if (review.getUsername() == null || review.getUsername().trim().isEmpty()) {
            review.setUsername("Anonymous");
        }

        Review savedReview = reviewRepository.save(review);
        return ResponseEntity.ok(savedReview);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
