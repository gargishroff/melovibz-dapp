// src/components/UserManagement.js
import React, { useState } from 'react';
import useApp from '../utils/useApp';
import './UserManagement.css';

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
        <div className="user-management-container">
            {isLoading ? (
                <div id="loader">
                    <p className="text-center">Loading...</p>
                </div>
            ) : (
                <div id="content">
                    {account ? (
                        isRegistered ? (
                            <div className="welcome-message">
                                <p>Welcome, {userName}</p>
                            </div>
                        ) : (
                            <div>
                                <h3>{userStatusMessage}</h3>
                                <form onSubmit={handleRegisterSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Enter User Name"
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        className="input-field"
                                        required
                                    />
                                    <button type="submit" className="btn">Register</button>
                                </form>
                            </div>
                        )
                    ) : (
                        <div>
                            <h3>Please connect your MetaMask to continue.</h3>
                            <button onClick={connectAccount} className="btn">Login</button>
                        </div>
                    )}
                </div>
            )}

            {/* Additional text section */}
            <div className="additional-text">
                <p>Thank you for joining Melovibz!</p><p>After connecting your wallet and registering to the platform, you can stream songs, upload your own music and buy songs... Enjoy!!</p>
            </div>
        </div>
    );
};

export default UserManagement;