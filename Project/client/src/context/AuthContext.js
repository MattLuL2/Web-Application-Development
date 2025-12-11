import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signup = async ({ name, email, password }) => {
    // TODO: Replace with actual API call
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) throw new Error('Sign up failed');
    const data = await res.json();
    setUser(data.user);
    // Optionally store token
  };

  const signin = async ({ email, password }) => {
    // TODO: Replace with actual API call
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Sign in failed');
    const data = await res.json();
    setUser(data.user);
    // Optionally store token
  };

  const signout = () => {
    setUser(null);
    // Optionally remove token
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
