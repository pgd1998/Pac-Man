import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernNavbar from '../components/headers/ModernNavbar';
import './HomePage.css';

const ModernHome = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('name');
        
        if (token) {
            setIsLoggedIn(true);
            setUserName(name || '');
        }
    }, []);

    const handlePlayClick = () => {
        navigate('/game');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="modern-home-container">
            <ModernNavbar />
            
            <div className="home-hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        WELCOME TO <span className="highlight">PAC-MAN</span>
                    </h1>
                    
                    {isLoggedIn ? (
                        <div className="welcome-user">
                            <p>Welcome back, <span className="user-name">{userName}</span>!</p>
                        </div>
                    ) : (
                        <p className="signup-message">Sign up to save your score and appear on the leaderboard.</p>
                    )}

                    <div className="hero-buttons">
                        <button className="play-button" onClick={handlePlayClick}>
                            PLAY NOW
                            <div className="button-decoration"></div>
                        </button>
                        
                        {!isLoggedIn && (
                            <div className="auth-buttons">
                                <button className="login-button" onClick={handleLoginClick}>
                                    LOGIN
                                </button>
                                <button className="signup-button" onClick={handleSignupClick}>
                                    SIGN UP
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="pacman-animation">
                    <div className="pacman"></div>
                    <div className="ghost ghost-red"></div>
                    <div className="ghost ghost-pink"></div>
                    <div className="ghost ghost-cyan"></div>
                    <div className="ghost ghost-orange"></div>
                    <div className="pellets"></div>
                </div>
            </div>
            
            <div className="game-features">
                <div className="feature-card">
                    <div className="feature-icon ghost-icon"></div>
                    <h3>Challenge Ghosts</h3>
                    <p>Navigate the maze while avoiding Blinky, Pinky, Inky, and Clyde - each with their own hunting strategy!</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon power-icon"></div>
                    <h3>Power Pellets</h3>
                    <p>Collect power pellets to turn the tables and hunt the ghosts for extra points!</p>
                </div>
                
                <div className="feature-card">
                    <div className="feature-icon score-icon"></div>
                    <h3>High Scores</h3>
                    <p>Compete for the highest score and track your progress with user accounts!</p>
                </div>
            </div>
            
            <footer className="home-footer">
                <p>Experience the classic arcade game reimagined for modern browsers!</p>
                <p className="developer-credit">Developed by Poorvith Gowda</p>
            </footer>
        </div>
    );
};

export default ModernHome;