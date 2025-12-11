import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/App.css';

function SignUp() {
  const { signup } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await signup(form);
    } catch (err) {
      setError(err.message || 'Sign up failed');
    }
  };

  return (
    <div className="auth-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" className="btn">Sign Up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SignUp;
