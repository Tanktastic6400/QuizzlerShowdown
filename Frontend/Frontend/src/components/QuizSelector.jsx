import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/QuizSelector.css"
import axios from "axios";
import throttle from "lodash.throttle";

function QuizSelector({loggedInUser}) {

    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [categoryData, setCategoryData] = useState(null);
    const [category, setCategory] = useState('9');
    const [type, setType] = useState('multiple');
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);



    const handleAmountChange = (event) => {
        let inputValue = event.target.value;

        let isNumber = !isNaN(inputValue && inputValue !== '');

        setNumberOfQuestions(inputValue);
        setIsValid(isNumber);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }
    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    }

    const throttledSubmit = throttle(async (quizData) => {
        try {
          await axios.post("http://localhost:8080/set-questions", quizData);
          navigate("/quizdisplay");
        } catch (error) {
          console.error(
            "There was an issue submitting quiz customization data",
            error
          );
        }finally{setIsSubmitting(false);}
      }, 2000);

    const handleSubmit = () => {
        if(isSubmitting){return;}
        if (isValid && numberOfQuestions) {
            const quizData = {
              amount: numberOfQuestions,
              valueOfCategory: category,
              type: type,
              difficulty: difficulty,
            };
            
            setIsSubmitting(true);
            throttledSubmit(quizData);
          } else {
            alert("Please enter a valid number of questions!");
          }
        };




    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(response => {
                setCategoryData(response.data);

            })
            .catch(error => {
                console.error("There was an error getting data from 'https://opentdb.com/api_category.php'");
            })
    }, []);





    return (
        <div>
            <h1>Please fill out the form, {loggedInUser.username}</h1>
            
                <div className="parameters">

                    <label className="labels" htmlFor="amount">Number of Questions: </label>
                    <input className="inputFields" id="amount" type="text" value={numberOfQuestions} onChange={handleAmountChange}></input>

                </div>
                <div className="parameters">

                    <label className="labels" htmlFor="Category">Category of Questions: </label>

                    <select className="selectorFields" name="category" id="category" onChange={handleCategoryChange}>
                        {categoryData && categoryData.trivia_categories.map((category, index) => (
                            <option key={category.id} value={category.id}>{category.name}</option> ))}
                          
                        
                        

                    </select>
                </div>
                <div className="parameters">

                    <label className="labels" htmlFor="Type">Type of Questions: </label>

                    <select className="selectorFields" name="type" id="type" onChange={handleTypeChange}>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True or False</option>
                    </select>
                </div>

                <div className="parameters">

                    <label className="labels" htmlFor="Difficulty">Difficulty: </label>

                    <select className="selectorFields" name="difficulty" id="difficulty" onChange={handleDifficultyChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <button id="submit" onClick={handleSubmit}>Submit</button>
                {/* <input id="submit" type="submit" onSubmit={handleSubmit}/> */}
            
        </div>
    );
}

export default QuizSelector;
