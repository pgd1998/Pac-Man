import React, { useState } from 'react';
import loginApi from '../../utils/loginApi';
const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');

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

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
            {isError && <p>{isError }</p>}
        </form>
    )
}

export default LoginForm;