// src/components/UserList.js
import React from 'react';

const UserList = ({ users }) => {
    return (
        <div className="user-list">
            <h3>Total Registered Users: {users.length}</h3>
            <ul className="list-group">
                {users.map((user, index) => (
                    <li key={index} className="list-group-item">
                        {user}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
