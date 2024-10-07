import React from "react";
import GameBoardHeader from "../components/headers/GameBoardHeader";
import GameBoard from "../components/GameBoard";
import './AnonymousGamePage.css';

const AnonymousGamePage = () => {
    return (
        <div className="page-container">
            <div className="header">
                <GameBoardHeader user={"userrrr"} />
            </div>
            <div className="game-board-container">
                <GameBoard />
            </div>
        </div>
    );
}

export default AnonymousGamePage;