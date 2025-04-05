import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp.js';
import './AuthForms.css';

const ModernSignupForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signup, loading, error } = useSignUp();
    const navigate = useNavigate();

    // Animation states
    const [formActive, setFormActive] = useState(false);

    useEffect(() => {
        // Activate form with animation
        const timer = setTimeout(() => setFormActive(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = {
            name,
            password
        };
        
        try {
            const res = await signup(signupData);
            setName('');
            setPassword('');
            
            if (res) {
                navigate('/game');
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    const handleCancelClick = () => {
        setName('');
        setPassword('');
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={`modern-auth-container ${formActive ? 'active' : ''}`}>
            <div className="auth-background">
                <div className="ghost-pattern"></div>
            </div>
            
            <div className="auth-card">
                <div className="auth-header signup-header">
                    <div className="auth-logo">
                        <div className="ghost-logo"></div>
                    </div>
                    <h2>Create an Account</h2>
                    <p>Sign up to save your high scores</p>
                </div>

                <form className="modern-auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-container">
                            <input 
                                id="username"
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Choose a username" 
                                required 
                                autoComplete="username"
                            />
                            <div className="input-icon user-icon"></div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-container">
                            <input 
                                id="password"
                                type={passwordVisible ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Create a password" 
                                required 
                                autoComplete="new-password"
                            />
                            <div 
                                className={`input-icon password-toggle ${passwordVisible ? 'visible' : ''}`}
                                onClick={togglePasswordVisibility}
                            ></div>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-buttons">
                        <button 
                            type="submit" 
                            className="submit-button signup-button" 
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Sign Up'
                            )}
                        </button>

                        <button 
                            type="button" 
                            className="cancel-button" 
                            onClick={handleCancelClick}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <button 
                        className="switch-auth" 
                        onClick={() => navigate('/login')}
                        disabled={loading}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModernSignupForm;