import React, { useState } from "react";
import loginApi from "../utils/loginApi";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (loginData) => {
        try {
            setLoading(true);
            setError('')
            const response = await loginApi(loginData);
            localStorage.setItem('token', response);
            return response

        } catch (error) {
            setError('Login Failed. Please try again.')
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error };
}

export default useLogin;