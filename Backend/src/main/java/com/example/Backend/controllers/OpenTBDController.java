package com.example.Backend.controllers;


import com.example.Backend.configurations.ApiResponse;
import com.example.Backend.services.ApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OpenTBDController {

private final ApiService apiService;

public OpenTBDController(ApiService apiService){
    this.apiService = apiService;
}

@GetMapping("/trivia")
    public ApiResponse getTriviaQuestions(){
    return apiService.fetchTriviaQuestions(5, 9, "boolean");
}



}
