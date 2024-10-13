import './Modal.css';
import useLogout from '../../hooks/useLogout';
const LogoutModal = ({onClose}) => {
    const logout = useLogout();

    const handleButtonClick = () => {
        onClose();
        logout();
    }

    return (
        <div className='modal-backdrop'>
            <div className='modal'>
                <p>Are you sure you want to Logout?</p>
                <button onClick={handleButtonClick}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default LogoutModal;