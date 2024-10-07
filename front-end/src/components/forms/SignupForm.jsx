import React, { useState } from 'react';
import signupApi from '../../utils/signupApi';
const SignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError,setIsError]=useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = {
            name,
            password
        }
        try {
            setLoading(true);
            const response = await signupApi(signupData);
            localStorage.setItem('token',response)
            setName('');
            setPassword('');
            // TODO: after success route to Gameboard with a Welcome/Thank you message
        } 
        
        catch (error) {
            setIsError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
            <button type='submit' disabled={loading}>{loading? 'Signing up...':'Signup'}</button>
            {isError && <p>{ isError}</p>}
        </form>
    )
}

export default SignupForm;