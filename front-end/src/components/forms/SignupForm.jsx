import React, { useState } from 'react';
import signupApi from '../../utils/signupApi';
import useSignUp from '../../hooks/useSignUp';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { signup, loading, error } = useSignUp();

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

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit' disabled={loading}>{loading? 'Signing up...':'Signup'}</button>
            {error && <p>{ error}</p>}
        </form>
    )
}

export default SignupForm;