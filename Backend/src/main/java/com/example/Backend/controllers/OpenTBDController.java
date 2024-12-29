package com.example.Backend.controllers;


//import com.example.Backend.configurations.ApiResponse;
import com.example.Backend.configurations.ApiResponse;
import com.example.Backend.models.Question;
import com.example.Backend.services.ApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@RestController
public class OpenTBDController {

private final ApiService apiService;

public OpenTBDController(ApiService apiService){
    this.apiService = apiService;
}

@GetMapping("/trivia")
    public ApiResponse getTriviaQuestions(){

    return apiService.fetchTriviaQuestions(5, 9, "boolean", null);
}




public String createRandomQuiz(int amount){
    ApiResponse response = apiService.fetchTriviaQuestions(amount,null,null,null);

   List<ApiResponse.Question> tempString = response.getResults();

   //code before return statement is possibly junk code, this code returns the json object as a string.

//    Pattern pattern = Pattern.compile("\"([^\"]*)\"");
//    Matcher matcher = pattern.matcher(tempString);

//    List<String> matches = new ArrayList<>();
//    List<Question> questions = new ArrayList<>();
//
//    while(matcher.find()){
//        matches.add(matcher.group(1));
//    }
//    //remove first and last entry of list.
//    matches.remove(0);
//    matches.remove(matches.size() -1);
//
//    for(String item: matches){
////        if(item.matches("\))


//    }


    return tempString.get(0).toString();
}


/* reference of returned json object

* [results, type, multiple, difficulty, medium, category, Entertainment: Video Games, question, In the game Tom Clancy&#039;s Rainbow 6 Siege, what organization is Valkyrie from?, correct_answer, Navy Seals, incorrect_answers, S.A.S, G.I.G.N, F.B.I,
* type, multiple, difficulty, easy, category, General Knowledge, question, What is the shape of the toy invented by Hungarian professor Ernő Rubik?, correct_answer, Cube, incorrect_answers, Sphere, Cylinder, Pyramid, response_code]
end
* */




}
