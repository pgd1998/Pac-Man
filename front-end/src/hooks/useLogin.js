import React, { useState } from "react";
import loginApi from "../utils/loginApi.js";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (loginData) => {
        try {
            setLoading(true);
            setError('')
            const response = await loginApi(loginData);
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.userName);
            localStorage.setItem('userId', response.id);
            localStorage.setItem('high-score', response.highScore);
            localStorage.setItem('logged-in', 'yes');
            return response;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
            else {
                setError("Login Failed. Please try again.")
            }
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error };
}

export default useLogin;