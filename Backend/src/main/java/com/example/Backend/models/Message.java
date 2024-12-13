package com.example.Backend.models;

import jakarta.persistence.Entity;


@Entity
public class Message extends AbstractClass {
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    private String content;



}
