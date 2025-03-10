import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './GameOverPage.css';
import ClearScore from "../components/ClearScore.js";
import useUpdate from "../hooks/useUpdate.js";

const GameOver = () => {
    const navigate = useNavigate();
    const totalScore = sessionStorage.getItem('score');
    const userId = localStorage.getItem('userId');
    const updateHighScore = useUpdate(); 

    useEffect(() => {
        const updateScore = async () => {
            try {
                const updateData = {
                    highScore: totalScore,
                    userId
                };
                const updatedHighScore = await updateHighScore(updateData);
                console.log(updatedHighScore)
                localStorage.setItem('high-score', updatedHighScore);
                console.log(sessionStorage.getItem('score'))
            } catch (error) {
                console.error("Failed to update high score:", error);
            }
        };
        if(userId){
            updateScore();
        }
    }, [totalScore, userId,updateHighScore]);

    const handleButtonClick = () => {
        ClearScore(navigate);
    };

    const handlePlayClick = () => {
        sessionStorage.removeItem('score');
        navigate('/game');
    };

    return (
        <div className="game-over-container">
            <div className="game-over-content">
                <h1>Game Over!</h1>
                <br />
                <div className="score">Total Score: {totalScore ? totalScore : 0}</div>
                <div className="buttons">
                    <button className='home-button' onClick={handleButtonClick}>Home</button>
                    <button className="play-button" onClick={handlePlayClick}>Play Again</button>
                </div>
            </div>
        </div>
    );
};

export default GameOver;