import "../CSS/QuizDisplay.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AnswerDisplay from "./AnswerDisplay";


function QuizDisplay({ loggedInUser }) {

    const [questionData, setQuestionsData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [passingThreshold, setThreshold] = useState(0);
    const [userid, setUserId] = useState(loggedInUser.id);
    const [add, setAdd] = useState(true);
    const navigate = useNavigate();
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [score, setScore] = useState(0);

    const allProps = {
        questionData: questionData,
        selectedAnswers: selectedAnswers,
        correctAnswers: correctAnswers,
        passingThreshold: passingThreshold,
        score: score,
        numberOfQuestions: numberOfQuestions,
        numberOfCorrectAnswers: numberOfCorrectAnswers,
        userid: userid,
    };

    function createAllProps() {

    };

    useEffect(() => {

        axios.get('http://localhost:8080/questions')
            .then(response => {
                setQuestionsData(response.data);

                const correctAnswers = response.data.results.reduce((acc, question, index) => {
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
        let totalQuestions = 0;

        Object.keys(correctAnswers).forEach((index) => {
            totalQuestions++;
            if (selectedAnswers[index] === correctAnswers[index]) {

                numberOfCorrectAnswers = numberOfCorrectAnswers + 1;
            }
        })



        setThreshold(totalQuestions / 2);
        setNumberOfQuestions(totalQuestions);

        setNumberOfCorrectAnswers(numberOfCorrectAnswers);

        if (numberOfCorrectAnswers >= passingThreshold) {
            setScore(numberOfCorrectAnswers * 10);

        } else {
            setScore((numberOfCorrectAnswers * 10) / 2)
        }

    }

    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [questionIndex]: answer,
        }));
    }

    const handleSubmit = () => {

        checkAnswers();
    };

    
    useEffect(() => {
        if (score > 0 || numberOfCorrectAnswers > 0 || numberOfQuestions > 0) {
            axios.post('http://localhost:8080/userservice/updateScore', null, {
                params: {
                    ID: userid, score: score, add: add, correctAnswers: numberOfCorrectAnswers, numberOfQuestions: numberOfQuestions
                }
            }).then(response => {                
                // This ensures navigation happens only after the score is updated
    
            }).catch(error => {
                console.error("There was an issue grading answers", error);
            });
            


            const allProps = {
                questionData: questionData,
                selectedAnswers: selectedAnswers,
                correctAnswers: correctAnswers,
                passingThreshold: passingThreshold,
                score: score,
                numberOfQuestions: numberOfQuestions,
                numberOfCorrectAnswers: numberOfCorrectAnswers,
                userid: userid,
            };
            navigate("/answerDisplay", { state: allProps });
        }
    }, [score, numberOfQuestions, numberOfCorrectAnswers]);


    return (
        <div className="tableSurround">
            <h1> Quiz Questions</h1>


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
                            <td class="questionStats">Number: {questionIndex + 1}</td>
                            <td class="questionStats">{question.difficulty}</td>
                            <td class="questionStats" dangerouslySetInnerHTML={{ __html: question.category}}></td>
                            <td class="questionStats" dangerouslySetInnerHTML={{ __html: question.question }} />
                            <td class="questionStats">{mixAnswers(question, questionIndex).map((answers, answersIndex) => (

                                <div style={{ display: "flex" }} key={answersIndex}>
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
                                        dangerouslySetInnerHTML={{ __html: answers }}
                                    />
                                </div>
                            ))}</td>

                        </tr>
                    ))}
                </tbody>


            </table>

            <button className="submitButton" id="submitAnswers" name="submitAnswers" onClick={handleSubmit}>Submit Answers</button>

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
