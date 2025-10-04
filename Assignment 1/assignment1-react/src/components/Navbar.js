import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/MattLogo.png';
import './Navbar.css';

// Navbar component renders a brand area (logo + title) and navigation links.
// The image is imported from src/images and bundled by the build system.
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand: image logo on the left plus title text */}
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-title">Matthew Lloyd</span>
        </div>

        {/* Navigation links use NavLink so the active route can be styled via the `active` class */}
        <ul className="navbar-links">
          <li><NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink></li>
          <li><NavLink to="/services" className={({isActive}) => isActive ? 'active' : ''}>Services</NavLink></li>
          <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
