package com.example.Backend.models.data;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional <User> findByUsername (String username);
    Optional <User> findByEmail(String email);
    Optional <User> findById(long ID);
    //User findByUserProfile(UserProfile userProfile);
    //User findByProfile_ID(long profile_id);
    //@Query(value = "SELECT e FROM User WHERE e.id = profile_id")
    //User findByProfile_ID (long profileID);
    List<User> findByUsernameContaining(String username);
}
