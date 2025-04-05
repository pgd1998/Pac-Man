import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUpdate from "../hooks/useUpdate.js";
import ClearScore from "../components/ClearScore.js";
import './GameOverPage.css';

const ModernGameOver = () => {
    const navigate = useNavigate();
    const [totalScore, setTotalScore] = useState(0);
    const [isScoreVisible, setIsScoreVisible] = useState(false);
    const [isHighScore, setIsHighScore] = useState(false);
    const [userName, setUserName] = useState('');
    const [oldHighScore, setOldHighScore] = useState(0);
    const userId = localStorage.getItem('userId');
    const updateHighScore = useUpdate();

    useEffect(() => {
        // Animation sequence
        setTimeout(() => {
            setIsScoreVisible(true);
        }, 1000);

        const score = sessionStorage.getItem('score') || 0;
        setTotalScore(Number(score));
        
        // Get user info if logged in
        const name = localStorage.getItem('name');
        if (name) setUserName(name);

        const highScore = localStorage.getItem('high-score');
        if (highScore) {
            setOldHighScore(Number(highScore));
            if (Number(score) > Number(highScore)) {
                setIsHighScore(true);
            }
        }

        // Update high score in database if logged in
        const updateScore = async () => {
            if (userId && score) {
                try {
                    const updateData = {
                        highScore: score,
                        userId
                    };
                    const updatedHighScore = await updateHighScore(updateData);
                    localStorage.setItem('high-score', updatedHighScore);
                } catch (error) {
                    console.error("Failed to update high score:", error);
                }
            }
        };
        
        if (userId) {
            updateScore();
        }
    }, [userId, updateHighScore]);

    const handleHomeClick = () => {
        ClearScore(navigate);
    };

    const handlePlayAgainClick = () => {
        sessionStorage.removeItem('score');
        navigate('/game');
    };

    return (
        <div className="modern-game-over-container">
            <div className="game-over-content">
                <h1 className="game-over-title">Game Over</h1>
                
                <div className={`score-display ${isScoreVisible ? 'visible' : ''}`}>
                    <div className="score-value">{totalScore}</div>
                    <div className="score-label">POINTS</div>
                </div>
                
                {isHighScore && userId && (
                    <div className="high-score-alert">
                        <div className="trophy-icon"></div>
                        <div className="high-score-message">
                            <p>New High Score!</p>
                            <p className="previous-score">Previous: {oldHighScore}</p>
                        </div>
                    </div>
                )}

                {userName && (
                    <div className="player-info">
                        <span>Player: </span>
                        <span className="player-name">{userName}</span>
                    </div>
                )}
                
                <div className="game-over-buttons">
                    <button className="play-again-button" onClick={handlePlayAgainClick}>
                        <span>Play Again</span>
                        <div className="button-icon restart-icon"></div>
                    </button>
                    
                    <button className="home-button" onClick={handleHomeClick}>
                        <span>Home</span>
                        <div className="button-icon home-icon"></div>
                    </button>
                </div>
                
                {!userId && (
                    <div className="signup-prompt">
                        <p>Create an account to save your high scores!</p>
                        <button 
                            className="signup-link"
                            onClick={() => {
                                ClearScore(navigate);
                                navigate('/signup');
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
            
            <div className="animated-ghosts">
                <div className="ghost ghost-red"></div>
                <div className="ghost ghost-pink"></div>
                <div className="ghost ghost-cyan"></div>
                <div className="ghost ghost-orange"></div>
            </div>
        </div>
    );
};

export default ModernGameOver;