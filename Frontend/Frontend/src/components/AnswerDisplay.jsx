import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

import "../CSS/AnswerDisplay.css"

// function AnswerDisplay({loggedInUser, numberOfQuestions, score}){
function AnswerDisplay() {

    const location = useLocation();
     const navigate = useNavigate();

    const {
        questionData,
        selectedAnswers,
        correctAnswers,
        passingThreshold,
        score,
        numberOfQuestions,
        numberOfCorrectAnswers,
        userid,
    } = location.state || {};


    const passed = (score >= passingThreshold);

    const gradeQuiz = () => {
        if (props) { }


    }

    const mixAnswers = (questions, questionIndex) => {
        let answers = [...questions.incorrect_answers, questions.correct_answer];

        if (questions.type === "boolean") {
            return answers.sort().reverse();
        } else {
            return answers.sort();
        }

    };

    const getAnswerStyle = (questionIndex, answer) => {
        if (selectedAnswers[questionIndex] === answer) {
            return answer === correctAnswers[questionIndex] ? { color: 'green' } : { color: 'red' }
        }

        if (answer === correctAnswers[questionIndex]) {
            return { color: 'green' };
        }
        return {};
    }

    const handleRetry = () => {
        navigate("/quizSelector")
    }


    return (
        <>
            <div className='title'>
                <h1>Results</h1>
                <div>
                    <h2>{passed ? "You Passed!" : "You Failed"}</h2>
                </div>
                <h2>Number of Questions: {numberOfQuestions}</h2>
                <h2>Number answered correctly: {numberOfCorrectAnswers}</h2>
                <h3>Score: {score}</h3>
            </div>

            <div>
                <button className="retryButton" id="retryButton" name="retryButton" onClick={handleRetry}>Create a different quiz?</button>
            </div>

            <div className="tableSurround">
                <h1> Quiz Questions</h1>


                <table className="questionTable" border="1">
                    <thead>
                        <tr className="questionTr" style={{}}>
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
                                <td className="questionTableTd">Number: {questionIndex + 1}</td>
                                <td className="questionTableTd">{question.difficulty}</td>
                                <td className="questionTableTd">{question.category}</td>
                                <td className="questionTableTd" dangerouslySetInnerHTML={{ __html: question.question }} />
                                <td className="questionTableTd">{mixAnswers(question, questionIndex).map((answers, answersIndex) => (

                                    <div style={{ display: "flex" }} key={answersIndex}>

                                        <label
                                            htmlFor={answersIndex}
                                            style={getAnswerStyle(questionIndex, answers)}
                                            dangerouslySetInnerHTML={{ __html: answers }}
                                        />
                                    </div>
                                ))}

                                </td>
                            </tr>
                        ))}
                    </tbody>


                </table>



            </div>





        </>
    );
}

export default AnswerDisplay;
{/* <td class="questionStats">{mixAnswers(question, questionIndex).map((answers, answersIndex) => (

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
))}</td> */}