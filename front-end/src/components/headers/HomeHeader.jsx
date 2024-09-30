import React from "react";
import { useNavigate } from 'react-router-dom';

const HeaderHome = () => {
    const navigate = useNavigate();

    const handleButtonClick = (action) => {
        if (action=='game') {
            navigate('/game')
        }
        else if (action == 'login') {
            navigate('/login')
        }
        else if (action == 'signup') {
            navigate('/signup')
        }
    }

    return (
        <div className="header-home">
            <button onClick={()=>handleButtonClick('game')}>Play Game</button>
            <button onClick={() => handleButtonClick('login')}>Login</button>
            <button onClick={() => handleButtonClick('signup')}>Signup</button>
        </div>
    )
}

export default HeaderHome;