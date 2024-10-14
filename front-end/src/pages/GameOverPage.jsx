import React from "react";
import { useNavigate } from "react-router-dom";
import './GameOverPage.css'
import ClearScore from "../components/ClearScore";

const GameOver = () => {
    const navigate = useNavigate();
    const totalScore = sessionStorage.getItem('score')
    
    const handleButtonClick = () => {
        ClearScore(navigate);
    }
    const handlePlayClick = () => {
        sessionStorage.removeItem('score');
        navigate('/game')
    }
    return (
        <div className="game-over-container">
            <div className="game-over-content">
                <h1>Game Over!</h1>
                <br/>
                <div className="score">Total Score: {totalScore ? totalScore:0}</div>
                <div className="buttons">
                    <button className='home-button' onClick={handleButtonClick}>Home</button>
                    <button className="play-button" onClick={handlePlayClick}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default GameOver;
