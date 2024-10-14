import React from "react";
// import './UtilsHeader.css';

const UtilsHeader = ({ className, lives, score, userName }) => {
    return (
        <div className={ className}>
            <div className="lives">Lives: {lives}</div>
            <div className="score">Score: {score}</div>
            {userName && <div>Name:{userName}</div>}
        </div>
    )
}

export default UtilsHeader;