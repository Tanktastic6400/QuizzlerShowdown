package com.example.Backend.controllers;



//import com.example.Backend.configurations.ApiResponse;
import com.example.Backend.DTO.QuestionDTO;
import com.example.Backend.configurations.OpenTBDResponse;
import com.example.Backend.services.OpenTBDService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class OpenTBDController {

private final OpenTBDService openTBDService;
private String amount;
private String category;
private String type;
private String difficulty;

public OpenTBDController(OpenTBDService openTBDService){
    this.openTBDService = openTBDService;
}



@GetMapping("/questions")
    public OpenTBDResponse getTriviaQuestions(){


    return createRandomQuiz(Integer.parseInt(this.amount), Integer.parseInt(this.category),type,difficulty);
}

@PostMapping("/set-questions")
    public void setQuestions(@RequestBody QuestionDTO questionRequest){
    try {
        this.amount = questionRequest.getAmount();
        this.category = questionRequest.getValueOfCategory();
        this.type = questionRequest.getType();
        this.difficulty = questionRequest.getDifficulty();

    }catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to process request: " + e.getMessage());
    }
}



private OpenTBDResponse createRandomQuiz(Integer amount, Integer category, String type, String difficulty){

    return openTBDService.fetchTriviaQuestions(amount,category,type,difficulty);
}

//-----------------------------------------------------------Abandon all hope yee who glance beyond this line, for the coding graveyard is not for the faint of heart ---------------------------------------------------------------//

/* reference of returned json object

* [results, type, multiple, difficulty, medium, category, Entertainment: Video Games, question, In the game Tom Clancy&#039;s Rainbow 6 Siege, what organization is Valkyrie from?, correct_answer, Navy Seals, incorrect_answers, S.A.S, G.I.G.N, F.B.I,
* type, multiple, difficulty, easy, category, General Knowledge, question, What is the shape of the toy invented by Hungarian professor Ernő Rubik?, correct_answer, Cube, incorrect_answers, Sphere, Cylinder, Pyramid, response_code]
end
* */

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




}
