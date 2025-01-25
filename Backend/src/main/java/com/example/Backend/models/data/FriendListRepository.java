package com.example.Backend.models.data;

import com.example.Backend.models.FriendList;
import com.example.Backend.models.FriendStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FriendListRepository extends JpaRepository<FriendList, Long> {

    List<FriendList> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);

    FriendList findByRequestId(String requestId);

}
