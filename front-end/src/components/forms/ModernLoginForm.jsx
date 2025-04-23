import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin.js';
import './AuthForms.css';

const ModernLoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { login, loading, error } = useLogin();

    // Animation states
    const [formActive, setFormActive] = useState(false);

    useEffect(() => {
        // Activate form with animation
        const timer = setTimeout(() => setFormActive(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            name,
            password
        };
        
        try {
            const res = await login(loginData);
            setName('');
            setPassword('');
            
            if (res) {
                navigate('/game');
            }
        } catch (error) {
            console.error("Login error:", error);
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
                <div className="pacman-pattern"></div>
            </div>
            
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <div className="pacman-logo"></div>
                    </div>
                    <h2>Login to Pac-Man</h2>
                    <p>Enter your credentials to continue</p>
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
                                placeholder="Enter your username" 
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
                                placeholder="Enter your password" 
                                required 
                                autoComplete="current-password"
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
                            className="submit-button" 
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                'Login'
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
                    <p>Don't have an account?</p>
                    <button 
                        className="switch-auth" 
                        onClick={() => navigate('/signup')}
                        disabled={loading}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModernLoginForm;