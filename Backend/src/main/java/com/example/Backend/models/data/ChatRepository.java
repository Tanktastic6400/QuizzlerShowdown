package com.example.Backend.models.data;

import com.example.Backend.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ChatRepository extends JpaRepository<Chat, Long> {
    Chat findBySenderIdAndReceiverId(Long sender, Long receiver);
    boolean existsByChatId(String chatId);

}
