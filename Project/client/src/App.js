import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Books = lazy(() => import('./pages/Books'));
const Users = lazy(() => import('./pages/Users'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Suspense fallback={<div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/books" element={<Books />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
