import React from "react";
import './UtilsHeader.css';

const UtilsHeader = ({ lives,score}) => {
    return (
        <div className="utils-header">
            <div className="lives">Lives: {lives}</div>
            <div className="score">Score: {score}</div>
        </div>
    )
}

export default UtilsHeader;