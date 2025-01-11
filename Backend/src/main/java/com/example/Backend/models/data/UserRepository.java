package com.example.Backend.models.data;

import com.example.Backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername (String username);
    User findByEmail(String email);
    List<User> findByUsernameContaining(String username);
}
