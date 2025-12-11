import React from 'react';
import UserList from '../components/UserList';
import '../styles/App.css';

function Users() {
  return (
    <div className="users-page">
      <h2>Users</h2>
      <UserList />
    </div>
  );
}

export default Users;
