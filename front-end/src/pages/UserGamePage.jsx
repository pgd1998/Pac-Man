import React from "react";
import {GameBoard} from "../components/GameBoard.jsx";
import GameBoardHeader from "../components/headers/GameBoardHeader.jsx";

const UserGamePage = () => {
    return (
        <div>
            <GameBoardHeader />
            <GameBoard/>
        </div>
    )
}

export default UserGamePage;

