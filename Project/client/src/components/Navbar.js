import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import Logo from './Logo';

function Navbar() {
  const { user, signout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Logo />
        <span className="site-name">Lloyd's Library</span>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/books' ? 'active' : ''}>
          <Link to="/books">Books</Link>
        </li>
        {user ? (
          <>
            <li className={location.pathname === '/users' ? 'active' : ''}>
              <Link to="/users">Users</Link>
            </li>
            <li className={location.pathname === '/profile' ? 'active' : ''}>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>
              <button className="signout-btn" onClick={signout}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li className={location.pathname === '/signup' ? 'active' : ''}>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li className={location.pathname === '/signin' ? 'active' : ''}>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
