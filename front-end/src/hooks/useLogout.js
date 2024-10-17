import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = useCallback(() => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('userId');
            localStorage.removeItem('high-score');
            if (localStorage.length === 0) {
                navigate('/')
            }
        } catch (error) {
            throw error;
        }
    },[navigate])
    return logout;
    
}

export default useLogout;