import React from "react";
import WelcomeMsgModal from "../modals/WelcomeMsg.jsx";
// import './UtilsHeader.css';


const UtilsHeader = ({ className, lives, score, userName, highScore }) => {
    const signedUp = localStorage.getItem('signed-up')
    const loggedIn=localStorage.getItem('logged-in')

    return (
            <div className={className}>
                <div className="lives">Lives: {lives}</div>
                <div className="score">Score: {score}</div>
                {userName && <div className="userName">User Name:{userName}</div>}
                {userName && <div className="highScore">High Score:{highScore} </div>}
                {loggedIn && <WelcomeMsgModal />}
                {signedUp && <WelcomeMsgModal />}
            </div>
    )
}

export default UtilsHeader;