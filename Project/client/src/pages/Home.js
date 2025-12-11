import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import BookList from '../components/BookList';
import '../styles/App.css';

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-page">
      <h1>Lloyd's Library</h1>
      <img src={require('../assets/logo.png')} alt="Team Logo" className="team-logo" />
      <p>Welcome to our book management platform!</p>
      <BookList />
      {!user && (
        <div className="auth-links">
          <a href="/signup" className="btn">Sign Up</a>
          <a href="/signin" className="btn">Sign In</a>
        </div>
      )}
    </div>
  );
}

export default Home;
