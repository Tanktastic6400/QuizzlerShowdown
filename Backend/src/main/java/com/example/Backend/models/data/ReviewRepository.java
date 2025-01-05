package com.example.Backend.models.data;

import com.example.Backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ReviewRepository extends JpaRepository<Review, Long> {
}
