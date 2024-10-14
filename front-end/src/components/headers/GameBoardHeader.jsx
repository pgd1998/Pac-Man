import React,{useEffect, useState} from "react";
import QuitModal from "../modals/QuitModal";
import HomeModal from "../modals/HomeModal";
import LogoutModal from "../modals/LogoutModal";
import './GameboardHeader.css';

const GameBoardHeader = () => {
    const [isQuitModalVisible, setIsQuitModalVisible] = useState(false);
    const [isHomeModalVisible, setIsHomeModalVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsLoggedIn(!!token)
    },[])

    const openHomeModal = () => {
        setIsHomeModalVisible(true);
    }

    const closeHomeModal = () => {
        setIsHomeModalVisible(false);
    }
    
    const openQuitModal = () => {
        setIsQuitModalVisible(true);
    }

    const closeQuitModal = () => {
        setIsQuitModalVisible(false);
    }

    const openLogoutModal = () => {
        setIsLogoutModalVisible(true);
    }

    const closeLogoutModal = () => {
        setIsLogoutModalVisible(false);
    }
    
    const toggleDropdown = () => {
        document.getElementById("dropdown-content").classList.toggle("show");
    };

    return (
        <div className="game-board-header">
            <button className="home-button" onClick={openHomeModal}>Home</button>
            {isHomeModalVisible && <HomeModal onClose={closeHomeModal} />}
            <button className="quit-button" onClick={openQuitModal}>Quit</button>
            {isQuitModalVisible && <QuitModal onClose={closeQuitModal} />}
            <button className="guide-button">Guide</button>
            {isLoggedIn && <button className="logout-button" onClick={openLogoutModal}>Logout</button>}
            {isLogoutModalVisible && <LogoutModal onClose={closeLogoutModal} />}

            {/* Dropdown for small / medium screens */}
            <div className="dropdown">
                <button onClick={toggleDropdown} className="dropbtn">Menu</button>
                <div id="dropdown-content" className="dropdown-content">
                    <button onClick={openHomeModal}>Home</button>
                    <button onClick={openQuitModal}>Quit</button>
                    <button>Guide</button>
                    {isLoggedIn && <button onClick={openLogoutModal}>Logout</button>}
                </div>
            </div>
        </div>
    )
}

export default GameBoardHeader;