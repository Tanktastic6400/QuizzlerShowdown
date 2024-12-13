package com.example.Backend.service;

import com.example.Backend.configurations.ApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    private final RestTemplate restTemplate;

    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApiResponse fetchTriviaQuestions(int numQuestions) {
        String url = "https://opentdb.com/api.php?amount= ${numQuestions}"; // Adjust parameters as needed
        return restTemplate.getForObject(url, ApiResponse.class);
    }
}
