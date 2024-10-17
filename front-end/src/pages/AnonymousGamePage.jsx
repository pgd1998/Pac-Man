import React from "react";
import GameBoardHeader from "../components/headers/GameBoardHeader";
import GameBoard from "../components/GameBoard";
import './AnonymousGamePage.css';
import UtilsHeader from "../components/headers/UtilsHeader";
import '../components/GameBoard.css'
import { useState } from "react";
const AnonymousGamePage = () => {
    const [lives,setLives]=useState(2)
    const [score, setScore] = useState(() => {
        const savedScore = sessionStorage.getItem('score');
        return savedScore ? parseInt(savedScore) : 0;
    });
    const userName = localStorage.getItem('name')
    const highScore=localStorage.getItem('high-score')
    return (
        <div className="game-page-container">
            <GameBoardHeader />
            <UtilsHeader className="utils-header" lives={lives} score={score} userName={userName} highScore={highScore}/>
            
                <GameBoard className="game-header" lives={lives} setLives={setLives} setScore={setScore} />
        </div>
    );
}

export default AnonymousGamePage;