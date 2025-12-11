import React from 'react';

function Profile({ user }) {
  if (!user) return <div>Not logged in.</div>;
  return (
    <div className="profile-info">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default Profile;
