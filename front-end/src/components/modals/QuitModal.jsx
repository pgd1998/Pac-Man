import { useNavigate } from "react-router";
import './Modal.css';
const QuitModal = ({onClose}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        onClose();
        // ClearScore(navigate);
        navigate('/game-over')
    }
    
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <p>Are You sure you want to exit the game?</p>
                <button onClick={handleButtonClick}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default QuitModal;