import React from "react";
// import './UtilsHeader.css';

const UtilsHeader = ({ className, lives, score, userName, highScore }) => {
    return (
        <div className={ className}>
            <div className="lives">Lives: {lives}</div>
            <div className="score">Score: {score}</div>
            {userName && <div className="userName">Name:{userName}</div>}
            {userName && <div className="high-score">High Score:{ highScore} </div>}
        </div>
    )
}

export default UtilsHeader;