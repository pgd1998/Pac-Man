import React from "react";
// import './UtilsHeader.css';

const UtilsHeader = ({ className,lives,score}) => {
    return (
        <div className={ className}>
            <div className="lives">Lives: {lives}</div>
            <div className="score">Score: {score}</div>
        </div>
    )
}

export default UtilsHeader;