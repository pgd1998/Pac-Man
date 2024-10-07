import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router';
import useLogin from '../../hooks/useLogin';
import UserGamePage from '../../pages/UserGamePage';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData={
            name,
            password
        }
        try {
            const res = await login(loginData);
            setName('');
            setPassword('')
            // TODO: After success route to Gameboard with a Welcome back message
            if (res){
                navigate('/user-game')
            }
        }
        catch {
            // setIsError("Login failed Try again.")
        }
    }

    const handleCancelClick = () => {
        setName('');
        setPassword('')
        navigate('/')
    }

    return (
        <div className='form-container'>
            <form className="form" onSubmit={handleSubmit}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <div className='button-container'>
                    <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                    <button type='cancel' onClick={handleCancelClick}>Cancel</button>
                </div>
                {error && <p>{error }</p>}
            </form>
        </div>
    )
}

export default LoginForm;