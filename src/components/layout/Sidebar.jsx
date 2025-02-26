import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './../common/styles/Sidebar.css';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="user-avatar">
          <img src={currentUser.avatar || '/default-avatar.jpg'} alt={currentUser.name} />
        </div>
        <div className="user-info">
          <h3 className="user-name">{currentUser.name}</h3>
          <p className="user-email">{currentUser.email}</p>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? 'active' : ''}
              end
            >
              <i className="fas fa-home"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/create-event" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <i className="fas fa-plus-circle"></i>
              Create Event
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/my-events" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <i className="fas fa-calendar-alt"></i>
              My Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/registered-events" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <i className="fas fa-ticket-alt"></i>
              Registered Events
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <i className="fas fa-user"></i>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <i className="fas fa-cog"></i>
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;