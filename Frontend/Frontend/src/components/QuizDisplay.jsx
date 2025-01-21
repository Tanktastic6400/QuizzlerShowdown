import "../CSS/QuizDisplay.css"
import React, { useState, useEffect } from "react";

import axios from "axios";


function QuizDisplay({loggedInUser}) {
  
    const [questionData, setQuestionsData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({})

    useEffect(() =>{

    axios.get('http://localhost:8080/questions')
    .then(response => {
        setQuestionsData(response.data);
        const correctAnswers = response.data.results.reduce((acc,question,index) =>{
            acc[index] = question.correct_answer;
            return acc;
        }, {});
        setCorrectAnswers(correctAnswers);

    })
    .catch((error) => {
        console.error("There was an error when getting questions from 'http://localhost:8080/questions'", error);
    });

}, []);



    const mixAnswers = (questions, questionIndex) => {
        let answers = [...questions.incorrect_answers, questions.correct_answer];
      
        if (questions.type === "boolean") {
            return answers.sort().reverse();
        } else {
            return answers.sort();
        }

    };

    const checkAnswers = () => {
        let numberOfCorrectAnswers = 0;
        Object.keys(correctAnswers).forEach((index)=>
        {
            if(selectedAnswers[index] === correctAnswers[index]){
                numberOfCorrectAnswers = numberOfCorrectAnswers + 1;
            }
        })

       return numberOfCorrectAnswers;
    }

    const handleAnswerChange = (questionIndex, answer) =>{
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [questionIndex]: answer,
        }));
    }

    const handleSubmit = () =>{
        console.log('Selected Answers:', selectedAnswers)
        console.log(correctAnswers);
        console.log('\n Correct Answers:', checkAnswers())
        axios.post('http://localhost:8080/graded-answers', {
            // numberOfCorrectAnswers: parseInt(checkAnswers(), 10)

            numberOfCorrectAnswers: checkAnswers()
        }).then(response => {
           
        }).catch(error => {
            console.error("There was an issue grading answers", error);
        });

    }

    return (
        <div className="tableSurround">
            <h1> Quiz Questions</h1>
            {/* <h1>{loggedInUser.username}</h1> */}
            
            <table border="1">
                <thead>
                    <tr style={{}}>
                        <th>Question number</th>
                        <th>Difficulty</th>
                        <th>Category</th>
                        <th>Question</th>
                        <th>Answers</th>

                    </tr>
                </thead>
                <tbody>
                    {questionData && questionData.results.map((question, questionIndex) => (
                        <tr key={questionIndex}>
                            <td class="questionStats">Number: {questionIndex +1}</td>
                            <td class="questionStats">{question.difficulty}</td>
                            <td class="questionStats">{question.category}</td>
                            <td class="questionStats" dangerouslySetInnerHTML={{ __html: question.question }} />
                            <td class="questionStats">{mixAnswers(question, questionIndex).map((answers, answersIndex) => (
                                
                                <div style={{display: "flex"}} key={answersIndex}>
                                    <input 
                                    type="radio" 
                                    key={answersIndex} 
                                    id={answersIndex} 
                                    name={'Answer' + questionIndex} 
                                     class="answerRadio" 
                                     onChange={() => handleAnswerChange(questionIndex, answers)}></input>

                                    <label 
                                    htmlFor={answersIndex}
                                     class="answerLabel" 
                                     dangerouslySetInnerHTML={{__html: answers}}
                                     />
                                </div>
                            ))}</td>

                        </tr>
                    ))}
                </tbody>


            </table>

                    <button class="submitButton" id= "submitAnswers" name="submitAnswers" onClick={handleSubmit}>Submit Answers</button>

        </div>
    )

}

export default QuizDisplay;

// const testQuestion =
// {
//     "results": [
//         {
//             "type": "boolean",
//             "difficulty": "easy",
//             "category": "General Knowledge",
//             "question": "Pluto is a planet.",
//             "correct_answer": "False",
//             "incorrect_answers": [
//                 "True"
//             ]

//         },
//         {
//             "type": "boolean",
//             "difficulty": "hard",
//             "category": "General Knowledge",
//             "question": "In Scandinavian languages, the letter &Aring; means river.",
//             "correct_answer": "True",
//             "incorrect_answers": [
//                 "False"
//             ]
//         },
//         {
//             "type": "multiple",
//             "difficulty": "hard",
//             "category": "Entertainment: Video Games",
//             "question": "In &quot;Call Of Duty: Zombies&quot;, what does the game traditionally reward you for completing a boss round?",
//             "correct_answer": "Max Ammo",
//             "incorrect_answers": [
//                 "A Pack-A-Punched gun",
//                 "Death Machine",
//                 "Monkey Bombs"
//             ]
//         }

//     ]
// }
