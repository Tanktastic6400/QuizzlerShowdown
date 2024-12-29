package com.example.Backend.services;

import com.example.Backend.configurations.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ApiService {

    private final RestTemplate restTemplate;

    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }



    public ApiResponse fetchTriviaQuestions(Integer amountOfQuestions, Integer valueOfCategory, String type, String difficulty){
        String baseUrl = "https://opentdb.com/api.php?";
        String url;
        UriComponentsBuilder urlBuilder = UriComponentsBuilder.fromUriString(baseUrl);

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
            urlBuilder.queryParam("difficult", difficulty);
        }
        if(type != null){
            urlBuilder.queryParam("type", type);
        }

        url = urlBuilder.toUriString();

        return restTemplate.getForObject(url,ApiResponse.class);
    }



    private String convertResponseToString(ApiResponse response){

        ObjectMapper objectMapper= new ObjectMapper();

        try{
            return objectMapper.writeValueAsString(response);
        }catch (Exception e){
            throw new RuntimeException("Failed to convert ApiResponse to String", e);
        }
    }


}
