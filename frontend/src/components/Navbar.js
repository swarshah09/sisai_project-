// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.scss';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
        <Link to="/">
            <img src="https://www.sisaitechnologies.com/img/logo-three.png" alt="Logo" className="navbar-logo" />
        </Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/admin">Admin Panel</Link></li>
        </ul>
      </nav>
    );
  };

export default Navbar;