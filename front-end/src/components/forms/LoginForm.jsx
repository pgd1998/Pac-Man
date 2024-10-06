import React, { useState } from 'react';
import loginApi from '../../utils/loginApi';
import './Login.css'
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData={
            name,
            password
        }
        try {
            setIsLoading(true);
            const response = await loginApi(loginData);
            localStorage.setItem('token', response);
            setName('');
            setPassword('')
            // TODO: After success route to Gameboard with a Welcome back message
        }
        catch {
            setIsError("Login failed Try again.")
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleCancelClick = () => {
        setName('');
        setPassword('')
        navigate('/')
    }

    return (
        <div className='login-form-container'>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <div className='button-container'>
                    <button type='submit' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                    <button type='cancel' onClick={handleCancelClick}>Cancel</button>
                </div>
                {isError && <p>{isError }</p>}
            </form>
        </div>
    )
}

export default LoginForm;