import React from "react";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
    const navigate = useNavigate();

    const handleButtonClick = (action) => {
        if (action == 'home') {
            // TODO: Handle Quit Modal Logic and then go to Home
        }
        else if (action == 'quit') {
            // TODO: Handle Quit Modal Logic and then go to Home
        }
    }

    return (
        <div>
            <button onClick={() => handleButtonClick('home')}>Home</button>
            <button onClick={()=>handleButtonClick('quit')}>Quit</button>
        </div>
    )
}

export default UserHeader;