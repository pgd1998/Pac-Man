import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ClearScore from "../components/ClearScore";

const useLogout = () => {
    const navigate = useNavigate();
    const logout = useCallback(() => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            if (localStorage.getItem('userId')) {
                localStorage.removeItem('userId');
            }
            if (localStorage.getItem('high-score')) {
                localStorage.removeItem('high-score');
            }
            if (localStorage.length === 0) {
                ClearScore(navigate);
            }
        } catch (error) {
            throw error;
        }
    },[navigate])
    return logout;
    
}

export default useLogout;