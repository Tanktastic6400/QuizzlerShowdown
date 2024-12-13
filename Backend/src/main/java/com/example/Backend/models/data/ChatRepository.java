package com.example.Backend.models.data;

import com.example.Backend.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findByUser1IdAndUser2Id(Long user1Id, Long user2Id);
}
