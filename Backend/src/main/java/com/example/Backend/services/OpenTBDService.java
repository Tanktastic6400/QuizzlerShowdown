package com.example.Backend.services;

import com.example.Backend.configurations.OpenTBDResponse;
import com.example.Backend.utils.RateLimiter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OpenTBDService {

    private final RateLimiter rateLimiter;
    private final RestTemplate restTemplate;

    public OpenTBDService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.rateLimiter = new RateLimiter(5);
    }
//
    public OpenTBDResponse fetchTriviaQuestions(Integer amountOfQuestions, Integer valueOfCategory, String type, String difficulty){
        String baseUrl = "https://opentdb.com/api.php?";
        String url;
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString(baseUrl);

        if(!rateLimiter.throttle()){
            throw new RuntimeException("Amount of question requests exceeded, please try in a few seconds.");
        }

        if(amountOfQuestions != null && amountOfQuestions >0 ){
            urlBuilder.queryParam("amount", amountOfQuestions);
        }
        else{
            urlBuilder.queryParam("amount", 10);
        }
        if(valueOfCategory != null && valueOfCategory >0 ){
            urlBuilder.queryParam("category", valueOfCategory);
        }
        if(difficulty != null){
            urlBuilder.queryParam("difficulty", difficulty);
        }
        if(type != null){
            urlBuilder.queryParam("type", type);
        }

        url = urlBuilder.toUriString();
        System.out.println(url);

        return restTemplate.getForObject(url, OpenTBDResponse.class);
    }

    private String convertResponseToString(OpenTBDResponse response){

        ObjectMapper objectMapper= new ObjectMapper();

        try{
            return objectMapper.writeValueAsString(response);
        }catch (Exception e){
            throw new RuntimeException("Failed to convert ApiResponse to String", e);
        }
    }
}
