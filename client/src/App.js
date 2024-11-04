// src/App.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import MusicPlatformABI from './contracts/MusicPlatform.json'; // Adjust the path based on your project structure
import UploadSong from './components/UploadSong';
import PurchaseSong from './components/PurchaseSong';
import SongList from './components/SongList';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const loadBlockchainData = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const web3 = new Web3(window.ethereum);
        
                try {
                    // Request account access if needed
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
        
                    // Get the user's first account
                    const accounts = await web3.eth.getAccounts();
                    setAccount(accounts[0]);
        
                    // Get the network ID
                    const networkId = await web3.eth.net.getId();
                    const deployedNetwork = MusicPlatformABI.networks[networkId];
        
                    // Ensure deployedNetwork exists before accessing address
                    if (deployedNetwork && deployedNetwork.address) {
                        const instance = new web3.eth.Contract(
                            MusicPlatformABI.abi,
                            deployedNetwork.address
                        );
                        setContract(instance);
                    } else {
                        alert('Smart contract not deployed on this network');
                    }
                } catch (error) {
                    console.error('Error connecting to MetaMask', error);
                }
            } else {
                alert('Please install MetaMask to use this application.');
            }
        };

        loadBlockchainData();
    }, []);

    return (
        <div>
            <h1>Decentralized Music Platform</h1>
            <p>Account: {account}</p>
            {contract && (
                <>
                    <UploadSong contract={contract} account={account} />
                    <PurchaseSong contract={contract} account={account} />
                    <SongList contract={contract} />
                </>
            )}
        </div>
    );
};

export default App;
