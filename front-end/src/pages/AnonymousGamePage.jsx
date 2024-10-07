import React from "react";
import GameBoardHeader from "../components/headers/GameBoardHeader";
import GameBoard from "../components/GameBoard";
// import './AnonymousGamePage.css';
import '../components/GameBoard.css'

const AnonymousGamePage = () => {
    return (
        <div className="game-page-container">
                <GameBoardHeader user={"user"} />
                <GameBoard />
        </div>
    );
}

export default AnonymousGamePage;