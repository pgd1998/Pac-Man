import React, { useState } from "react";
import signupApi from "../utils/signupApi";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const signup=async(signupData)=>{
        try {
            setLoading(true);
            setError('')
            const response = await signupApi(signupData);
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.userName);
            localStorage.setItem('userId', response.id);
            localStorage.setItem('high-score', response.highScore);
            localStorage.setItem('signed-up','yes')
            return response;
    } catch (error) {
            setError('SignUp failed. Please Try again.')
            throw error;
        } finally {
            setLoading(false);
    }
    }
    return {signup, loading, error}
}

export default useSignUp;