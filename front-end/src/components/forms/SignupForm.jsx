import React, { useState } from 'react';
import './Login.css'
import useSignUp from '../../hooks/useSignUp';
import { useNavigate } from 'react-router';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { signup, loading, error } = useSignUp();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = {
            name,
            password
        }
        try {
            await signup(signupData);
            setName('');
            setPassword('');
            // TODO: after success route to Gameboard with a Welcome/Thank you message
        } 
        
        catch (error) {
            // setIsError("Signup failed. Please try again.");
        } 
    }
    const handleCancelClick = () => {
        setName('');
        setPassword('')
        navigate('/')
    }

    return (
        <div className='form-container'>
        <form className='form' onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <div className='button-container'>
                    <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                    <button type='cancel' onClick={handleCancelClick}>Cancel</button>
                </div>
            {error && <p>{ error}</p>}
            </form>
            </div>
    )
}

export default SignupForm;