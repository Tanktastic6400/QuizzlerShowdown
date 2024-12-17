package com.example.Backend.services;

import com.example.Backend.configurations.ApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ApiService {

    private final RestTemplate restTemplate;

    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ApiResponse fetchTriviaQuestions(int amountOfQuestions) {
        String baseUrl = "https://opentdb.com/api.php?";
        String url = UriComponentsBuilder.fromUriString(baseUrl).queryParam("amount", amountOfQuestions).toUriString();
        // Adjust parameters as needed
        return restTemplate.getForObject(url, ApiResponse.class);
    }

    public ApiResponse fetchTriviaQuestions(int amountOfQuestions, int valueOfCategory) {
        String baseUrl = "https://opentdb.com/api.php?";
        String url = UriComponentsBuilder.fromUriString(baseUrl).queryParam("amount", amountOfQuestions)
                .queryParam("category", valueOfCategory).toUriString();
        System.out.println(url);
        // Adjust parameters as needed
        return restTemplate.getForObject(url, ApiResponse.class);
    }

    public ApiResponse fetchTriviaQuestions(int amountOfQuestions, int valueOfCategory, String type) {
        String baseUrl = "https://opentdb.com/api.php?";
        String url = UriComponentsBuilder.fromUriString(baseUrl).queryParam("amount", amountOfQuestions)
                .queryParam("category", valueOfCategory).queryParam("type", type).toUriString();
        // Adjust parameters as needed
        return restTemplate.getForObject(url, ApiResponse.class);
    }


    public ApiResponse fetchTriviaQuestions(int amountOfQuestions, int valueOfCategory, String type, String difficulty){
       String baseUrl = "https://opentdb.com/api.php";
        String url = UriComponentsBuilder.fromUriString(baseUrl).queryParam("amount", amountOfQuestions)
                .queryParam("category", valueOfCategory).queryParam("difficulty", difficulty).queryParam("type", type).toUriString();


        return restTemplate.getForObject(url, ApiResponse.class);
    }

}
