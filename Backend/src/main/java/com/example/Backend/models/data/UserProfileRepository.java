package com.example.Backend.models.data;


import com.example.Backend.DTO.ScoreInfoDTO;
import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query(value = "SELECT e FROM UserProfile e ORDER BY score desc")
    public List<UserProfile> findAllSortedByScore(Pageable pageable); //For Top 10

    @Query(value = "SELECT e FROM UserProfile e ORDER BY score desc")
    public List<UserProfile> findAllSortedByScore(); //For everything but sorted.

    @Query(value = "SELECT new com.example.Backend.DTO.ScoreInfoDTO(e.score, u.username) FROM UserProfile e INNER JOIN e.user u where u.id = e.id ORDER by score desc")
    public List<ScoreInfoDTO> findAllSortedByScoreDTO(Pageable pageable); //Returns the score and corresponding username rather userProfile objects.



}
