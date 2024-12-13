package com.example.Backend.controllers;


import com.example.Backend.configurations.ApiResponse;
import com.example.Backend.service.ApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class OpenTBDController {

private final ApiService apiService;

public OpenTBDController(ApiService apiService){
    this.apiService = apiService;
}

//I don't go blah blah blah
@GetMapping("/trivia")
    public ApiResponse getTriviaQuestions(){
    return apiService.fetchTriviaQuestions(15);
}


}
