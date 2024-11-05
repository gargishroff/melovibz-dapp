// src/utils/useApp.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Melovibz from './contracts/Melovibz.json';

const useApp = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userStatusMessage, setUserStatusMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    // Initialize Web3 and load the contract
    useEffect(() => {
        const init = async () => {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    // Request accounts
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccount(accounts[0]);

                    // Load the contract
                    const contractInstance = TruffleContract(Melovibz);
                    contractInstance.setProvider(web3Instance.currentProvider);
                    const deployedContract = await contractInstance.deployed();
                    setContract(deployedContract);

                    // Check user registration status
                    await checkUserStatus(deployedContract, accounts[0]);
                } else {
                    console.error("Please install MetaMask!");
                }
            } catch (error) {
                console.error("Error initializing:", error);
            } finally {
                setIsLoading(false);
            }
        };

        init();
    }, []);

    const checkUserStatus = async (contractInstance, userAccount) => {
        try {
            const registered = await contractInstance.isUserRegistered(userAccount);
            setIsRegistered(registered);

            if (registered) {
                const name = await contractInstance.get_user_name(userAccount);
                setUserName(name);
            } else {
                setUserStatusMessage("Please enter your name to register.");
            }
        } catch (error) {
            console.error("Error checking user registration status:", error);
        }
    };

    const addUser = async (userName) => {
        try {
            if (!contract) return;
            await contract.add_new_user(userName, { from: account });
            setUserName(userName);
            setIsRegistered(true);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const connectAccount = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            await checkUserStatus(contract, accounts[0]);
        } catch (error) {
            if (error.code === 4001) {
                console.error("User denied account access");
            } else {
                console.error("Error connecting account:", error);
            }
        }
    };

    return {
        isLoading,
        account,
        userName,
        isRegistered,
        userStatusMessage,
        connectAccount,
        addUser
    };
};

export default useApp;
