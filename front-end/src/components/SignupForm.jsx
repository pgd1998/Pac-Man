import React, { useState } from 'react';
import signupApi from '../utils/signupApi';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <input type='submit'>Signup</input>
        </form>
    )
}

export default SignupForm;