import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/App.css';

function SignIn() {
  const { signin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signin(form);
    } catch (err) {
      setError(err.message || 'Sign in failed');
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="btn">Sign In</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SignIn;
