import React, { useState, useEffect } from "react";
import axios from "axios";

function QuizSelector() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [categoryData, setCategoryData] = useState(null);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleChange = (event) => {
    let inputValue = event.target.value;

    let isNumber = !isNaN(inputValue && inputValue !== "");

    setValue(inputValue);
    setIsValid(isNumber);
  };

  const handleSubmit = () => {
    if (isValid && value) {
      axios
        .post("http://localhost:8080/questions", {
          amount: value,
          category: category,
          type: type,
          difficulty: difficulty,
        })
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an issue submitting quiz customization data"
          );
        });
    } else {
      alert("Please enter desired amount of questions!");
    }
  };

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error getting data from 'https://opentdb.com/api_category.php'"
        );
      });
  }, []);

  return (
    <div>
      <label htmlFor="amount">Number of Questions </label>
      <input
        id="amount"
        type="text"
        value={value}
        onChange={handleChange}
      ></input>

      <label htmlFor="Category">Category of Questions </label>
      <select name="category" id="category">
        {categoryData &&
          categoryData.trivia_categories.map((category, index) => (
            <option value={category.id}>{category.name}</option>
          ))}
      </select>

      <label htmlFor="Type">Type of Questions </label>
      <select name="type" id="type">
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True or False</option>
      </select>

      <label htmlFor="Difficulty">Difficulty </label>
      <select name="difficulty" id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button id="submit" onClick={handleSubmit}></button>
      {/* <input id="submit" type="submit" onSubmit={handleSubmit}/> */}
    </div>
  );
}

export default QuizSelector;
{
  /* <option value="9">General Knowledge</option>
<option value="10">Books</option>
<option value="11">Film</option>
<option value="12">Music</option>
<option value="13">Musicals & Theatres</option>
<option value="14">Television</option>
<option value="15">Video Games</option>
<option value="16">Board Games</option>
<option value="17">Science & Nature</option>
<option value="18">Computers</option>
<option value="19">Mathematics</option>
<option value="20">Mythology</option>
<option value="21">Sports</option>
<option value="22">Geography</option>
<option value="23">History</option>
<option value="24">Politics</option>
<option value="25">Art</option>
<option value="26">Celebrities</option>
<option value="27">Animals</option>
<option value="28">Vehicles</option>
<option value="29">Comics</option>
<option value="30">Gadgets</option>
<option value="31">Japanese Anime & Manga</option>
<option value="32">Cartoon & Animations</option> */
}
