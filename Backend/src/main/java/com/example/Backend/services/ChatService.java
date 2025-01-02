package com.example.Backend.services;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.example.Backend.models.Chat;
import com.example.Backend.models.Message;
import com.example.Backend.models.User;
import com.example.Backend.models.data.ChatRepository;
import com.example.Backend.models.data.MessageRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean isValidChat(String chatId) {
        return chatRepository.existsByChatId(chatId);
    }

    public String getOrCreateChatId(Long senderId, Long recipientId) {
        String chatId = senderId < recipientId ? senderId + "-" + recipientId : recipientId + "-" + senderId;

        // Check if the chat already exists
        if (!chatRepository.existsByChatId(chatId)) {
            Chat chat = new Chat();

            chat.setSender(new User(senderId));
            chat.setReceiver(new User(recipientId));

            chat.setChatId(chatId);

            chatRepository.save(chat);
        }

        return chatId;
    }

    public void sendMessage(Long senderId, Long recipientId, String content) {
        Message message = new Message();
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User receiver = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String chatId = getOrCreateChatId(senderId, recipientId);
        message.setSender(sender);
        message.setRecipient(receiver);
        message.setChatId(chatId);
        message.setContent(content);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = now.format(formatter);
        message.setTimestamp(formattedDate);
        messageRepository.save(message);
        System.out.println("MESSAGE SHOULD SAVE TO REPO");
    }

    public List<Message> getMessages(Long userId1, Long userId2) {
        return messageRepository.findBySenderIdAndRecipientId(userId1, userId2);
    }

    public List<Message> getChat(String chatId) {
        return messageRepository.findByChatId(chatId);
    }
}
