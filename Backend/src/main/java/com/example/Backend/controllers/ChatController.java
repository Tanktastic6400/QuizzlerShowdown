package com.example.Backend.controllers;

import com.example.Backend.DTO.MessageRequestDTO;
import com.example.Backend.models.Message;
import com.example.Backend.models.data.MessageRepository;
import com.example.Backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {


    @Autowired
    private ChatService chatService;

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat.private.{chatId}")
    @SendTo("/topic/private.{chatId}")
    public Message handlePrivateChat(@DestinationVariable String chatId, @Payload Message message) {
        if (!chatService.isValidChat(chatId)) {
            throw new IllegalArgumentException("Invalid chatId");
        }
        message.setTimestamp(System.currentTimeMillis());
        return message;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequestDTO messageRequest) {
        if (messageRequest == null ||
                messageRequest.getSenderId() == null ||
                messageRequest.getRecipientId() == null ||
                messageRequest.getContent() == null ||
                messageRequest.getContent().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid input parameters");
        }

        try {
            chatService.sendMessage(
                    messageRequest.getSenderId(),
                    messageRequest.getRecipientId(),
                    messageRequest.getContent()
            );
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send message: " + e.getMessage());
        }
    }

    @GetMapping("/messages")
    public List<Message> getMessages(@RequestParam String chatid) {
        //return chatService.getMessages(user1Id, user2Id);
        return chatService.getChat(chatid);
    }

}
