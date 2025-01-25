import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Home.css';

export const Home = () => {
    const {user} = useSelector(state => state.user)
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Admin Dashboard</h1>
                <p>Manage your application with ease</p>
                <div className="cta-buttons">
                    {!user ? (
                        <>
                            <button 
                                className="primary-btn"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button 
                                className="secondary-btn"
                                onClick={() => navigate('/signup')}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <button 
                            className="primary-btn"
                            onClick={() => {
                                localStorage.removeItem('adminToken');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Analytics</h3>
                    <p>Track your performance with detailed analytics</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Fast & Efficient</h3>
                    <p>Optimized for maximum performance</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure</h3>
                    <p>Enterprise-grade security features</p>
                </div>
            </div>
        </div>
    );
};