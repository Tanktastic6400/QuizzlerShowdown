package com.example.Backend;

import com.example.Backend.controllers.OpenTBDController;
import com.example.Backend.services.ApiService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		OpenTBDController questions = new OpenTBDController(new ApiService(new RestTemplate()));

		System.out.println();
		System.out.println(questions.createRandomQuiz(2));
		System.out.println("end");



	}

}
