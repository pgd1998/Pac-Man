import React,{useState} from "react";
import QuitModal from "../modals/QuitModal";
import HomeModal from "../modals/HomeModal";
const AnonymousHeader = () => {
    const [isQuitModalVisible, setIsQuitModalVisible] = useState(false);
    const [isHomeModalVisible, setIsHomeModalVisible] = useState(false);

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
    

    return (
        <div>
            <button onClick={openHomeModal}>Home</button>
            {isHomeModalVisible && <HomeModal onClose={closeHomeModal} />} 
            <button onClick={openQuitModal}>Quit</button>
            {isQuitModalVisible && <QuitModal onClose={closeQuitModal}/>}
        </div>
    )
}

export default AnonymousHeader;