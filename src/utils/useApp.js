// src/utils/useApp.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import Melovibz from './contracts/Melovibz.json';
import { uploadToPinata } from './ipfsUtils'; // Import IPFS upload function

const useApp = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userStatusMessage, setUserStatusMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [donationAmount, setDonationAmount] = useState(''); // New state for donation amount
    const [artistName, setArtistName] = useState(''); // New state for artist name
    const [uploadedSongs, setUploadedSongs] = useState([]); // Track user's uploaded songs
    const [allSongs, setAllSongs] = useState([]); // To store all users' songs
    const [userListenCounts, setUserListenCounts] = useState({}); // Tracks listens per song
    const [songPurchaseStatus, setSongPurchaseStatus] = useState({});

    useEffect(() => {
        const init = async () => {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    setAccount(accounts[0]);

                    const contractInstance = TruffleContract(Melovibz);
                    contractInstance.setProvider(web3Instance.currentProvider);
                    const deployedContract = await contractInstance.deployed();
                    setContract(deployedContract);
                    fetchAllSongs(deployedContract);

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

    // useEffect(() => {
    //     if (contract) {
    //         fetchAllSongs(contract);
    //     }
    // }, [contract]);

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

// Function to upload music to IPFS and store IPFS hash on the blockchain
const uploadMusic = async (file, songName,price) => {
    try {
        if (!contract) throw new Error("Contract is not loaded");

        // Upload file to Pinata and get the IPFS hash
        const ipfsResponse = await uploadToPinata(file);
        const ipfsHash = ipfsResponse.IpfsHash;

        // Publish the song with the IPFS hash and song name
        await contract.publishSong(songName,price,ipfsHash, { from: account });

        // Update the uploaded songs state with the new IPFS hash
        setUploadedSongs((prevSongs) => [...prevSongs, ipfsHash]);

        console.log("Song uploaded to IPFS and saved in the contract with IPFS hash:", ipfsHash);
    } catch (error) {
        console.error("Error uploading music:", error);
    }
};


    const donateToArtist = async () => {
        try {
            if (!contract || !artistName || !donationAmount) return;

            // Get the artist's address using the name
            const artistAddress = await contract.getUserAddressByName(artistName);
            if (artistAddress === '0x0000000000000000000000000000000000000000') {
                setUserStatusMessage("Artist not found. Please check the name and try again.");
                console.log("hello")
                return;
            }

            // Proceed with the donation
            await contract.donateArtist(artistAddress, {
                from: account,
                value: web3.utils.toWei(donationAmount, 'ether'),
            });

            setUserStatusMessage(`Successfully paid ${donationAmount} ETH to ${artistName}`);
        } catch (error) {
            console.error("Error donating to artist:", error);
            setUserStatusMessage("Donation failed. Please try again.");
        }
    };

    const fetchAllSongs = async (contractInstance) => {
        try {
            // Fetch all songs from the contract
            const allSongsData = await contractInstance.getAllSongs();
    
            // Set the fetched songs in the state
            setAllSongs(allSongsData);
        } catch (error) {
            console.error("Error fetching all songs:", error);
        }
    };

    // Function to increment the listen count for a song
    const listenToSong = async (songID) => {
        try {
            if (!contract || !songID) return;

            // Call the contract method to increase the listen count
            await contract.listenToSong(songID, { from: account });

            console.log("Listen count updated for song ID:", songID);
        } catch (error) {
            console.error("Error increasing listen count:", error);
        }
    };

    // Function to purchase a song
    const purchaseSong = async (songID, price) => {
        try {
            if (!contract || !songID || !price) return;

            // Proceed with the purchase transaction
            await contract.purchaseSong(songID, { from: account, value: web3.utils.toWei(price, 'ether') });

            console.log("Song purchased with song ID:", songID);
        } catch (error) {
            console.error("Error purchasing song:", error);
        }
    };

    return {
        isLoading,
        account,
        userName,
        isRegistered,
        userStatusMessage,
        connectAccount,
        addUser,
        donationAmount,          // Return donation amount
        setDonationAmount,
        artistName,          // Return artist name
        setArtistName,       // Return setter for artist name
        donateToArtist, 
        uploadMusic,
        uploadedSongs,
        allSongs,
        listenToSong,
        purchaseSong,
    };
};

export default useApp;