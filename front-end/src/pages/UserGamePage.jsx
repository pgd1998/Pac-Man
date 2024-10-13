import React from "react";
import GameBoard from "../components/GameBoard";
import GameBoardHeader from "../components/headers/GameBoardHeader";

const UserGamePage = () => {
    return (
        <div>
            <GameBoardHeader />
            <GameBoard/>
        </div>
    )
}

export default UserGamePage;

