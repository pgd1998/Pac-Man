import React from "react";
import { useNavigate } from "react-router-dom";
import ClearScore from "../components/ClearScore";

const GameOver = () => {
    const navigate = useNavigate();
    const totalScore = sessionStorage.getItem('score')
    
    const handleButtonClick = () => {
        // navigate('/')
        ClearScore(navigate);
    }
    return (
        <div>
            <h1>Game Over!</h1>
            <br/>
            <div>High Score: {totalScore}</div>
            <button onClick={handleButtonClick}>Home</button>
        </div>
    )
}

export default GameOver;
