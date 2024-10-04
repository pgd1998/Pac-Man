import React from "react";
import AnonymousHeader from "../components/headers/AnonymousHeader";
import GameBoard from "../components/GameBoard";
import './AnonymousGamePage.css';

const AnonymousGamePage = () => {
    return (
        <div className="page-container">
            <div className="header">
                <AnonymousHeader />
            </div>
            <div className="game-board-container">
                <GameBoard />
            </div>
        </div>
    );
}

export default AnonymousGamePage;