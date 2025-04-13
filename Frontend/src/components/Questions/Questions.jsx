import React, { useState } from 'react';
import './Questions.css';
import { assets } from '../../assets/assets';
import questionsData from '../RandomQuestions/RandomQuestions';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Questions = () => {
    const navigate = useNavigate();

    const [gender, setGender] = useState(null);
    const [age, setAge] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);
    const [currentQnIndex, setCurrentQnIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [totalScore, setTotalScore] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [scoreCategory, setScoreCategory] = useState("");

    const loggedInUserEmail = localStorage.getItem("userEmail"); 
    const questions = questionsData?.[0]?.questions?.[gender] || [];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (selectedOption) {
            const newScore = totalScore + selectedOption.score;
            setTotalScore(newScore);

            setTimeout(() => {
                if (currentQnIndex < questions.length - 1) {
                    setCurrentQnIndex(currentQnIndex + 1);
                    setSelectedOption(null);
                } else {
                    let category = "";
                    if (newScore <= 10) category = "Low";
                    else if (newScore <= 20) category = "Medium";
                    else category = "High";

                    setFinalScore(newScore);
                    setScoreCategory(category);
                    setShowPopup(true); 
                }
            }, 500);
        } else {
            alert('Please select an option before proceeding!');
        }
    };

    const handlePrevious = () => {
        if (currentQnIndex > 0) {
            setCurrentQnIndex(currentQnIndex - 1);
            setSelectedOption(null);
        }
    };

    const handleStart = () => {
        if (gender && age) {
            setShowQuestions(true);
        } else {
            alert('Please select your gender and enter your age.');
        }
    };


    

    const handleProceedToMain = async () => {
        try {
            if (!loggedInUserEmail) {
                console.error("Error: User email not found in localStorage");
                alert("User not logged in. Please log in again.");
                return;
            }
    
            const response = await axios.post("http://localhost:4000/api/user/updateScore", {
                email: loggedInUserEmail, 
                gender: gender,
                age: age,
                overthinkingScore: finalScore
            });
    
            console.log("Response received:", response.data);
    
            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/main-page");
            } else {
                alert("Update failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Error updating score:", error);
            alert("Error updating details. Check console for details.");
        }
    };
    
    
 

    if (!showQuestions) {
        return (
            <div className="questions-container">
                <h1>Unwind Yourself</h1>

                <div className="input-group">
                    <label className="input-label">{questionsData[0].user_info.gender.question}</label>
                    <div className="gender-options">
                        {Object.keys(questionsData[0].user_info.gender.options).map((key) => (
                            <label key={key} className={`gender-option ${gender === key ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={key}
                                    onChange={() => setGender(key)}
                                    className="hidden-radio"
                                />
                                {questionsData[0].user_info.gender.options[key]}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label">{questionsData[0].user_info.age.question}</label>
                    <input
                        type="number"
                        className="age-input"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        min="1"
                    />
                </div>

                <button className="start-button" onClick={handleStart}>Start</button>
            </div>
        );
    }

    return (
        <div className="questions-container">
            <div className="questions-header">
                <img onClick={handlePrevious} src={assets.leftArrow} alt="Back" />
                <h1>Unwind Yourself</h1>
                <p>{currentQnIndex + 1} / {questions.length}</p>
            </div>

            <div className="questions-box">
                <h3>{questions[currentQnIndex].question}</h3>
                <ul>
                    {Object.keys(questions[currentQnIndex].options).map((key) => (
                        <li key={key}>
                            <input
                                type="radio"
                                name="option"
                                id={`option-${key}`}
                                checked={selectedOption === questions[currentQnIndex].options[key]}
                                onChange={() => handleOptionSelect(questions[currentQnIndex].options[key])}
                            />
                            <label htmlFor={`option-${key}`}>{questions[currentQnIndex].options[key].text}</label>
                        </li>
                    ))}
                </ul>
                <button onClick={handleNext} disabled={!selectedOption}>Next</button>
            </div>

            
            {showPopup && (
                <>
                    <div className="popup-overlay"></div> 
                    <div className="popup">
                        <h2>Your Overthinking Score: <span>{finalScore}</span></h2>
                        <p>Category: <strong>{scoreCategory}</strong></p>
                        <button onClick={handleProceedToMain}>Proceed to Main Page</button>
                    </div>
                </>
            )}

        </div>
    );
};

export default Questions;
