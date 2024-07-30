import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiGrid, FiSettings, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi';
import './menu.css';

const Menu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-header">
        <div className="menu-user">
          <FiUser size={24} />
          <span>User</span>
        </div>
        <button className="menu-close" onClick={toggleMenu}>
          &times;
        </button>
      </div>
      <nav>
        <ul>
          <li><Link to="/overview" onClick={toggleMenu}><FiHome /> Overview </Link></li>
          <li><Link to="/transactions" onClick={toggleMenu}><FiGrid /> Transactions</Link></li>
          <li><Link to="/settings" onClick={toggleMenu}><FiSettings /> Settings</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}><FiUser /> Contact & Feedback</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}><FiUser /> Profile</Link></li>
          <li><Link to="/login" onClick={toggleMenu}><FiLogIn /> Login</Link></li>
          <li><Link to="/logout" onClick={toggleMenu}><FiLogOut /> Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
