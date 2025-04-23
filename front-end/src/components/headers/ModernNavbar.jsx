import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModernNavbar.css';
import HomeModal from '../modals/HomeModal';
import QuitModal from '../modals/QuitModal';
import LogoutModal from '../modals/LogoutModal';

const ModernNavbar = ({ isGamePage = false, lives = 0, score = 0, userName = null, highScore = null }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showHomeModal, setShowHomeModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleHomeClick = () => {
    if (isGamePage) {
      setShowHomeModal(true);
    } else {
      navigate('/');
    }
  };

  const handleQuitClick = () => {
    setShowQuitModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handlePlayClick = () => {
    navigate('/game');
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setMenuOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="modern-navbar">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <div className="pacman-icon"></div>
          <span>PAC-MAN</span>
        </div>

        {isGamePage ? (
          <div className="game-stats">
            {lives !== undefined && (
              <div className="stat-item lives">
                <span className="stat-label">LIVES</span>
                <span className="stat-value">{lives}</span>
              </div>
            )}
            {score !== undefined && (
              <div className="stat-item score">
                <span className="stat-label">SCORE</span>
                <span className="stat-value">{score}</span>
              </div>
            )}
            {userName && (
              <div className="stat-item username">
                <span className="stat-label">PLAYER</span>
                <span className="stat-value">{userName}</span>
              </div>
            )}
            {highScore && (
              <div className="stat-item highscore">
                <span className="stat-label">HIGH</span>
                <span className="stat-value">{highScore}</span>
              </div>
            )}
          </div>
        ) : null}

        <div className="navbar-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`menu-items ${menuOpen ? 'open' : ''}`}>
            {isGamePage ? (
              <>
                <button className="menu-btn home-btn" onClick={handleHomeClick}>
                  Home
                </button>
                <button className="menu-btn guide-btn">Guide</button>
                <button className="menu-btn quit-btn" onClick={handleQuitClick}>
                  Quit
                </button>
                {isLoggedIn && (
                  <button className="menu-btn logout-btn" onClick={handleLogoutClick}>
                    Logout
                  </button>
                )}
              </>
            ) : (
              <>
                <button className="menu-btn play-btn" onClick={handlePlayClick}>
                  Play Game
                </button>
                {!isLoggedIn ? (
                  <>
                    <button className="menu-btn login-btn" onClick={handleLoginClick}>
                      Login
                    </button>
                    <button className="menu-btn signup-btn" onClick={handleSignupClick}>
                      Signup
                    </button>
                  </>
                ) : (
                  <button className="menu-btn logout-btn" onClick={handleLogoutClick}>
                    Logout
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showHomeModal && <HomeModal onClose={() => setShowHomeModal(false)} />}
      {showQuitModal && <QuitModal onClose={() => setShowQuitModal(false)} />}
      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </>
  );
};

export default ModernNavbar;