package com.example.Backend.services;

import com.example.Backend.models.User;
import com.example.Backend.models.UserProfile;
import com.example.Backend.models.data.UserProfileRepository;
import com.example.Backend.models.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

import java.util.Optional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;


    public User getUserByID(long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElseThrow(() -> new RuntimeException("No user with ID found"));
    }

    public void updateStats(UserProfile statProfile, int correctAnswers, int numberOfQuestions, int newScore, boolean add){
        int quizzesTaken = statProfile.getQuizzesTaken()+1;
        int totalCorrect = statProfile.getTotalCorrectAnswers()+correctAnswers;
        int totalAnswered = statProfile.getQuestionsAnswered()+numberOfQuestions;
        float correctAnswerPercentage = ( (float) totalCorrect / totalAnswered)*100;
        int currentScore = statProfile.getScore();
        if(add){
            currentScore+= newScore;
        }
        statProfile.setScore(currentScore);
        statProfile.setQuizzesTaken(quizzesTaken);
        statProfile.setTotalCorrectAnswers(totalCorrect);
        statProfile.setQuestionsAnswered(totalAnswered);
        statProfile.setCorrectAnswerPercentage(correctAnswerPercentage);
        userProfileRepository.save(statProfile);
        determineLevel(statProfile, currentScore, quizzesTaken, totalCorrect, totalAnswered, correctAnswerPercentage);
    }

    public void determineLevel(UserProfile statProfile, int score, int quizzesTaken, int totalCorrect, int totalAnswered, float correctAnswerPercentage)
    {
        int currentLevel = statProfile.getLevel();
        if(currentLevel == 10){
            return;
        }
        if(score >= currentLevel*200 && quizzesTaken >=5*currentLevel && totalCorrect >= 25*currentLevel && totalAnswered >= 50*currentLevel && correctAnswerPercentage >= (40.00+5.0*currentLevel)){
            statProfile.setLevel(currentLevel+1);
            userProfileRepository.save(statProfile);
        }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void updateUserProfile(UserProfile userProfile){
        userProfileRepository.save(userProfile);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(User user){
        userRepository.deleteById(user.getId());
    }

    public List<User> findUser(String username) {
        return userRepository.findByUsernameContaining(username); // Adjust repository method as needed
    }
}
