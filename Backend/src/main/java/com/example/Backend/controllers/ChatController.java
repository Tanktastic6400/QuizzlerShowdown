package com.example.Backend.controllers;

import com.example.Backend.models.Chat;
import com.example.Backend.models.Message;
import com.example.Backend.models.User;
import com.example.Backend.models.data.MessageRepository;
import com.example.Backend.models.data.UserRepository;
import com.example.Backend.services.ChatService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    @Transactional
    @MessageMapping("/chat.private.{chatId}")
    @SendTo("/topic/private.{chatId}")
    public Message handlePrivateChat(@DestinationVariable String chatId, @Payload Message message) {


        if (!chatService.isValidChat(chatId)) {
            throw new IllegalArgumentException("Invalid chatId");
        }
        User messageSender = chatService.getUserById(message.getUser1().getId());
        User messageReceiver = chatService.getUserById(message.getUser2().getId());

        message.setUser1(messageSender);
        message.setUser2(messageReceiver);
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

    @GetMapping("/chatid")
    public ResponseEntity<String> getChatId(@RequestParam Long user1, @RequestParam Long user2) {
        try {
            String ChatUUID = chatService.getOrCreateChatId(user1, user2);

            return ResponseEntity.ok(ChatUUID);
        } catch (Exception e) {
            System.err.println("Error in finding chat id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/chatinfo")
    public ResponseEntity<Chat> getChatInfo(@RequestParam String chatid){
        try{
            Chat chatinfo = chatService.getChatInfo(chatid);
            return ResponseEntity.ok(chatinfo);
        } catch (Exception e){
            System.err.println("Error in finding chat id: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
