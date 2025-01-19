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
import java.util.Optional;
import java.util.UUID;

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

    public User getUserById(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String getOrCreateChatId(Long senderId, Long recipientId) {

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User receiver = userRepository.findById(recipientId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Chat chat = chatRepository.findBySenderIdAndReceiverId(senderId, recipientId);
        if(chat == null){
            String newChatId = UUID.randomUUID().toString();
            if (!chatRepository.existsByChatId(newChatId)) {
                Chat newChat = new Chat();
                newChat.setSender(sender);
                newChat.setReceiver(receiver);
                newChat.setChatId(newChatId);
                chatRepository.save(newChat);
            }
        }

        return chat.getChatId();

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

    public Chat getMessages(Long senderId, Long receiverId) {
        System.out.println("Called from chat service, Sender: " + senderId + " Receiver: " + senderId);
        return chatRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    public List<Message> getChat(String chatId) {
        return messageRepository.findByChatId(chatId);
    }
}
