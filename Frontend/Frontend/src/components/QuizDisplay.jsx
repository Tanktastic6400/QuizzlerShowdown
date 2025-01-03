import "./QuizDisplay.css"

import axios from "axios";

function QuizDisplay() {

    const testQuestion =
    {
        "results": [
            {
                "type": "boolean",
                "difficulty": "easy",
                "category": "General Knowledge",
                "question": "Pluto is a planet.",
                "correct_answer": "False",
                "incorrect_answers": [
                    "True"
                ]

            },
            {
                "type": "boolean",
                "difficulty": "hard",
                "category": "General Knowledge",
                "question": "In Scandinavian languages, the letter &Aring; means river.",
                "correct_answer": "True",
                "incorrect_answers": [
                    "False"
                ]
            },
            {
                "type": "multiple",
                "difficulty": "hard",
                "category": "Entertainment: Video Games",
                "question": "In &quot;Call Of Duty: Zombies&quot;, what does the game traditionally reward you for completing a boss round?",
                "correct_answer": "Max Ammo",
                "incorrect_answers": [
                    "A Pack-A-Punched gun",
                    "Death Machine",
                    "Monkey Bombs"
                ]
            }

        ]
    }

    const mixAnswers = (questions) => {
        let answers = [...questions.incorrect_answers, questions.correct_answer];
        if (questions.type === "boolean") {
            return answers.sort().reverse();
        } else {
            return answers.sort();
        }

    };


    return (
        <div>
            <h1> Quiz Questions</h1>
            <table border="1">
                <thead>
                    <tr style={{}}>
                        <th style={{}}>Type</th>
                        <th>Difficulty</th>
                        <th>Category</th>
                        <th>Question</th>
                        <th>Answers</th>

                    </tr>
                </thead>
                <tbody>
                    {testQuestion.results.map((question, index) => (
                        <tr key={index}>
                            <td class="questionStats">{question.type}</td>
                            <td class="questionStats">{question.difficulty}</td>
                            <td class="questionStats">{question.category}</td>
                            <td class="questionStats" dangerouslySetInnerHTML={{ __html: question.question }} />
                            <td class="questionStats">{mixAnswers(question).map((answers, index) => (
                                // <button style={{padding: "10px", margin: "5px" }} key={index}>
                                // {answers}
                                // </button>
                                <div style={{display: "flex"}}>
                                    <input type="radio" key={index} id={index} class="answerRadio"></input>
                                    <label for={index} class="answerLabel">{answers}</label>
                                </div>
                            ))}</td>

                        </tr>
                    ))}
                </tbody>


            </table>


        </div>
    )

}

export default QuizDisplay;