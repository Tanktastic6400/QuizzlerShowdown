package com.example.Backend.models.data;

import com.example.Backend.models.Chat;
import com.example.Backend.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    //List<Message> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    @Query("SELECT m FROM Message m WHERE (m.user2.id = :user2 AND m.user1.id = :user1) OR (m.user2.id = :user1 AND m.user1.id = :user2)")
    List<Message> findChatsBetweenUsers(@Param("user1")Long user1, @Param("user2")Long user2);

    @Query("SELECT m FROM Message m WHERE (m.user2.id = :user1 OR m.user1.id = :user1)")
    List<Message> findChatsWithUsers(@Param("user1")Long user1);

    List<Message> findByChatId(String chatId);
}
