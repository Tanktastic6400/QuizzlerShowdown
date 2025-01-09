package com.example.Backend.controllers;
import com.example.Backend.models.Message;
import com.example.Backend.models.User;
import com.example.Backend.models.data.MessageRepository;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.format.DateTimeFormatter;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat.private.{chatId}")
    @SendTo("/topic/private.{chatId}")
    public Message handlePrivateChat(@DestinationVariable String chatId, @Payload Message message) {
        if (!chatService.isValidChat(chatId)) {
            throw new IllegalArgumentException("Invalid chatId");
        }
        Optional<User> user1 = userRepository.findById(1L);
        Optional<User> user2 = userRepository.findById(2L);

        System.out.println("Chat ID: " + chatId);
        System.out.println("Received message: " + message.getContent());
        System.out.println("Sender: " + message.getSender().getId());
        System.out.println("Recipient: " + message.getRecipient().getId());
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDate = now.format(formatter);
        message.setTimestamp(formattedDate);
        message.setChatId(chatId);
        messageRepository.save(message);
        System.out.println(message.toString());
        return message;
    }

    @GetMapping("/messages")
    public List<Message> getMessages(@RequestParam String chatId) {
        return chatService.getChat(chatId);
    }

}
