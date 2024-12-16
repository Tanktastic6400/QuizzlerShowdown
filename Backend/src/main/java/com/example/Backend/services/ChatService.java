package com.example.Backend.services;

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

    public boolean isValidChat(String chatid) {
        return chatRepository.existsByChatid(chatid);
    }


    public String getOrCreateChatId(Long senderId, Long recipientId) {
        String chatid = senderId < recipientId ? senderId + "-" + recipientId : recipientId + "-" + senderId;


        // Check if the chat already exists
        if (!chatRepository.existsByChatid(chatid)) {
            Chat chat = new Chat();

            chat.setSender(new User(senderId));
            chat.setReceiver(new User(recipientId));

            chat.setChatid(chatid);

            chatRepository.save(chat);
        }

        return chatid;
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
        message.setChatid(chatId);
        message.setContent(content);
        message.setTimestamp(System.currentTimeMillis());
        messageRepository.save(message);
    }

    public List<Message> getMessages(Long userId1, Long userId2) {
        return messageRepository.findBySenderIdAndRecipientId(userId1, userId2);
    }

    public List<Message> getChat(String chatid) {
        return messageRepository.findByChatid(chatid);
    }
}
