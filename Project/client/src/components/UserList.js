import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="user-list">
      <h3>User List</h3>
      <ul>
        {users.length === 0 ? (
          <li>No users found.</li>
        ) : (
          users.map(user => (
            <li key={user._id}>
              {user.name} ({user.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UserList;
