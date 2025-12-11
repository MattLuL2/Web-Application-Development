import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Profile from '../components/Profile';
import '../styles/Profile.css';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <Profile user={user} />
    </div>
  );
}

export default ProfilePage;
