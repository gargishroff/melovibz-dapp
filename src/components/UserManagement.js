// src/components/UserManagement.js
import React, { useState } from 'react';
import useApp from '../utils/useApp';
import RegisterForm from './RegisterForm';

const UserManagement = () => {
    const {
        isLoading,
        account,
        userName,
        isRegistered,
        userStatusMessage,
        connectAccount,
        addUser
    } = useApp();
    
    const [newUserName, setNewUserName] = useState('');

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        addUser(newUserName);
        setNewUserName('');
    };

    return (
        <div className="container" style={{ width: '650px' }}>
            {isLoading ? (
                <div id="loader">
                    <p className="text-center">Loading...</p>
                </div>
            ) : (
                <div id="content">
                    {account ? (
                        isRegistered ? (
                            <div>
                                <p id="accountAddress" className="text-center">Welcome, {userName}</p>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-center">{userStatusMessage}</h3>
                                <form onSubmit={handleRegisterSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="UserName">User Name</label>
                                        <input
                                            type="text"
                                            id="UserName"
                                            className="form-control"
                                            placeholder="Enter User name"
                                            value={newUserName}
                                            onChange={(e) => setNewUserName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            </div>
                        )
                    ) : (
                        <div>
                            <h3 className="text-center">Please connect your MetaMask to continue.</h3>
                            <button onClick={connectAccount} className="btn btn-success">Login</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserManagement;