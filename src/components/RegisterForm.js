// src/components/RegisterForm.js
import React, { useState, useEffect } from 'react';
import useApp from '../utils/useApp';

const RegisterForm = () => {
    const { account, contract } = useApp();
    const [userName, setUserName] = useState('');
    const [status, setStatus] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        // Check if the user is already registered
        const checkRegistration = async () => {
            if (contract && account) {
                try {
                    const registered = await contract.isUserRegistered(account);
                    setIsRegistered(registered);
                } catch (error) {
                    console.error("Error checking registration status:", error);
                }
            }
        };
        checkRegistration();
    }, [contract, account]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userName) {
            alert("Please enter a username.");
            return;
        }

        setStatus("Registering...");

        try {
            // Register the user with the smart contract
            await contract.add_new_user(userName, { from: account });
            setStatus("Registration successful!");
            setIsRegistered(true);
        } catch (error) {
            console.error("Error registering user:", error);
            setStatus("Registration failed.");
        }
    };

    return (
        <div className="register-form">
            {!isRegistered ? (
                <>
                    <h3>Please Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                className="form-control"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p>{status}</p>
                </>
            ) : (
                <p>Welcome back, {userName}!</p>
            )}
        </div>
    );
};

export default RegisterForm;
