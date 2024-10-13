import React,{useEffect, useState} from "react";
import QuitModal from "../modals/QuitModal";
import HomeModal from "../modals/HomeModal";
import LogoutModal from "../modals/LogoutModal";
const GameBoardHeader = ({ user}) => {
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
    

    return (
        <div>
            <button onClick={openHomeModal}>Home</button>
            {isHomeModalVisible && <HomeModal onClose={closeHomeModal} />} 
            <button onClick={openQuitModal}>Quit</button>
            {isQuitModalVisible && <QuitModal onClose={closeQuitModal} />}
            <button>Guide</button>
            {isLoggedIn && <button onClick={openLogoutModal}>Logout</button>}
            {isLogoutModalVisible && <LogoutModal onClose={closeLogoutModal}/>}
        </div>
    )
}

export default GameBoardHeader;