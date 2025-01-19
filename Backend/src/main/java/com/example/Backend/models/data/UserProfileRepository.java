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
    //@Query(value = "SELECT id, score FROM UserProfile e ORDER BY score desc")
    public List<UserProfile> findAllSortedByScore(Pageable pageable); //For Top 10
    @Query(value = "SELECT e FROM UserProfile e ORDER BY score desc")
    public List<UserProfile> findAllSortedByScore(); //For everything but sorted.

//    @Query(value = "select username, score\n" +
//            "from users\n" +
//            "inner join user_profiles\n" +
//            "on profile_id = user_profiles.id\n" +
//            "order by score desc\n" +
//            "limit 10;", nativeQuery = true)
//    @Query(value = "select username, score\n" +
//            "from user_profiles\n" +
//            "inner join users\n" +
//            "on user_profiles.id = profile_id\n" +
//            "order by score desc", nativeQuery = true)
//            //"limit 10;", nativeQuery = true)

//    @Query(value = "SELECT new com.example.Backend.DTO.ScoreInfoDTO(e.score) FROM UserProfile e ORDER BY score desc")
//    public List<ScoreInfoDTO> findAllSortedByScoreWithUsernames(Pageable pageable);
//
//    @Query(value = "SELECT e FROM UserProfile e INNER JOIN e.user u where u.id = e.id ORDER by score desc")
//    public List<UserProfile> findAllSortedByScoreJoinTest(Pageable pageable); //For everything but sorted.
//
//    @Query(value = "SELECT new com.example.Backend.DTO.ScoreInfoDTO(e.score) FROM UserProfile e INNER JOIN e.user u where u.id = e.id ORDER by score desc")
//    public List<ScoreInfoDTO> findAllSortedByScoreJoinTest2(Pageable pageable); //For everything but sorted.

    @Query(value = "SELECT new com.example.Backend.DTO.ScoreInfoDTO(e.score, u.username) FROM UserProfile e INNER JOIN e.user u where u.id = e.id ORDER by score desc")
    public List<ScoreInfoDTO> findAllSortedByScoreDTO(Pageable pageable); //For everything but sorted.


}
