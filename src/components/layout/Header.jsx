import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';
import '../../styles/Header.css';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">EventHub</Link>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            {currentUser && <li><Link to="/dashboard">Dashboard</Link></li>}
          </ul>
        </nav>
        
        <div className="auth-buttons">
          {currentUser ? (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <img src={currentUser.avatar || '/default-avatar.jpg'} alt={currentUser.name} />
                </div>
                <span className="user-name">{currentUser.name}</span>
              </div>
              <div className="user-dropdown">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;