package com.example.Backend.models.data;

import com.example.Backend.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    //@Query("SELECT c FROM Chat c WHERE (c.user1.id = :user1 AND c.user2.id = :user2) OR (c.user1.id = :user2 AND c.user2.id = :user1)")
    //Chat findBySenderIdAndReceiverId(@Param("sender")Long sender, @Param("receiver")Long receiver);

    boolean existsByChatId(String chatId);
    Chat findByChatId(String chatId);

    @Query("SELECT c FROM Chat c WHERE (c.user2.id = :user2 AND c.user1.id = :user1) OR (c.user2.id = :user1 AND c.user1.id = :user2)")
    Chat findChatsBetweenUsers(@Param("user1")Long user1, @Param("user2")Long user2);

    @Query("SELECT c FROM Chat c WHERE (c.user2.id = :user1 OR c.user1.id = :user1)")
    public List<Chat> findChatsWitUser(@Param("user1")Long user1);
}
