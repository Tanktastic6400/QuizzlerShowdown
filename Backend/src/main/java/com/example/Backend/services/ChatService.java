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

    public List<Chat> getAllChats(Long id){
        return chatRepository.findChatsWitUser(id);
    }
    public void clearChats(Long toNullify){
        List<Chat> listOfChats = getAllChats(toNullify);

        for (Chat chat : listOfChats) {
            chat.setUser1(null);
            chat.setUser2(null);
            chatRepository.save(chat);
            chatRepository.deleteById(chat.getId());
        }
    }

    public void clearMessages(Long toNullify)
    {
        List <Message> listOfMessages = messageRepository.findChatsWithUsers(toNullify);
        for (Message message : listOfMessages) {
            messageRepository.deleteById(message.getId());
        }
    }

    public User getUserById(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String getOrCreateChatId(Long user1Id, Long user2Id) {

        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new RuntimeException("User not found"));


        Chat testChat = chatRepository.findChatsBetweenUsers(user1Id, user2Id);
        if(testChat == null){
            String newChatId = UUID.randomUUID().toString();
            if (!chatRepository.existsByChatId(newChatId)) {
                Chat newChat = new Chat();
                newChat.setUser1(user1);
                newChat.setUser2(user2);
                newChat.setChatId(newChatId);
                chatRepository.save(newChat);
            }
        }
        System.out.println(testChat.toString());

        return testChat.getChatId();

    }

    public void sendMessage(Long user1Id, Long user2Id, String content) {
        Message message = new Message();
        User user1 = userRepository.findById(user1Id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User user2 = userRepository.findById(user2Id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String chatId = getOrCreateChatId(user1Id, user2Id);

        message.setUser1(user1);
        message.setUser2(user2);
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
        return chatRepository.findChatsBetweenUsers(senderId, receiverId);
    }

    public List<Message> getChat(String chatId) {
        return messageRepository.findByChatId(chatId);
    }

    public Chat getChatInfo(String chatId){

        return chatRepository.findByChatId(chatId);
    }
}
