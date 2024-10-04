import ClearScore from "../ClearScore"
import { useNavigate } from "react-router";
import './Modal.css';
const HomeModal = ({onClose}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        onClose();
        ClearScore(navigate);
    }
    
    return (
        <div className="modal-backdrop">
            <div className="quit-modal">
                <p>Are You sure you want to exit the game?</p>
                <button onClick={handleButtonClick}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default HomeModal;