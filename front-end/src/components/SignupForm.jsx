import React, { useState } from 'react';
import signupApi from '../utils/signupApi';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const signupData = {
            name,
            password
        }
        const response = await signupApi(signupData);
        localStorage.setItem('token',response)
        setName('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit'>Signup</button>
        </form>
    )
}

export default SignupForm;