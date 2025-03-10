import React,{ useState } from "react";
import GameBoardHeader from "../components/headers/GameBoardHeader";
import {GameBoard} from "../components/GameBoard";
import './GamePage.css';
import UtilsHeader from "../components/headers/UtilsHeader";
// import '../components/GameBoard.css'
import WelcomeMsgModal from "../components/modals/WelcomeMsg";

const GamePage = () => {
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(() => {
        const savedScore = sessionStorage.getItem('score');
        return savedScore ? parseInt(savedScore) : 0;
    });
    const userName = localStorage.getItem('name');
    const highScore = localStorage.getItem('high-score');

    return (
        <div className="game-page-container">
            <GameBoardHeader />
            <UtilsHeader className="utils-header" lives={lives} score={score} userName={userName} highScore={highScore} />
            <GameBoard className="game-header" lives={lives} setLives={setLives} setScore={setScore} />
            {/* <WelcomeMsgModal/> */}
        </div>
    );
}

export default GamePage;