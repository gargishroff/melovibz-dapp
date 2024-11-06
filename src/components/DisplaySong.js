import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useApp from '../utils/useApp';
import './DisplaySong.css';  // Assuming the CSS is in the same folder

const DisplaySongs = () => {
    const { allSongs, isLoading, isRegistered, listenToSong, purchaseSong } = useApp();
    const [songFiles, setSongFiles] = useState({}); // To store the files corresponding to IPFS hashes
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Store the songID of the currently playing song
    const [price, setPrice] = useState('0'); // Store the price of the song
    const audioRefs = useRef({}); // Ref to track all audio elements
    const pinataGateway = 'https://gateway.pinata.cloud/ipfs/';

    // Fetch song files from IPFS using the song's ipfsHash
    const fetchSongFile = async (ipfsHash) => {
        try {
            const response = await axios.get(`${pinataGateway}${ipfsHash}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching file from Pinata:', error);
            return null;
        }
    };

    // Load song files when allSongs are available
    useEffect(() => {
        if (allSongs && allSongs.length > 0) {
            allSongs.forEach(async (song) => {
                const file = await fetchSongFile(song.ipfsHash);
                setSongFiles((prevState) => ({
                    ...prevState,
                    [song.songID]: file, // Store the file based on song ID
                }));
            });
        }
    }, [allSongs]);

    // Handle song play
    const handlePlaySong = async (songID) => {
        // If the song is already playing, stop it
        if (currentlyPlaying === songID) {
            audioRefs.current[songID].pause();
            setCurrentlyPlaying(null);
        } else {
            // Pause the currently playing song if any
            if (currentlyPlaying !== null && audioRefs.current[currentlyPlaying]) {
                audioRefs.current[currentlyPlaying].pause();
            }
            // Play the new song
            setCurrentlyPlaying(songID);
            audioRefs.current[songID].play();
            await listenToSong(songID);
        }
    };

    // Handle song purchase
    const handlePurchaseSong = async (songID, price) => {
        await purchaseSong(songID, price);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!isRegistered) return <div>Please register to view songs.</div>;

    return (
        <div className="display-songs-container">
            <h2 style={{fontFamily: 'Great Vibes, cursive'}}>Browse Songs</h2>
            <table className="songs-table">
                <thead>
                    <tr>
                        <th>Song ID</th>
                        <th>Song Name</th>
                        <th>Artist Name</th>
                        <th>Song Preview</th>
                        <th>Price (ETH)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allSongs.map((song, index) => (
                        <tr key={index}>
                            <td>{song.songID}</td>
                            <td>{song.song_name}</td>
                            <td>{song.owner}</td>
                            <td>
                                {/* If the song file is available, display it */}
                                {songFiles[song.songID] ? (
                                    <div className="audio-player">
                                    <button
                                        className="play-button"
                                        onClick={() => handlePlaySong(song.songID)}
                                    >
                                        {currentlyPlaying === song.songID ? 'Pause' : 'Play'}
                                    </button>
                                    <audio
                                        ref={(ref) => (audioRefs.current[song.songID] = ref)}
                                        controls
                                        style={{ display: 'none' }} // Hide the default controls
                                    >
                                        <source
                                            src={`${pinataGateway}${song.ipfsHash}`}
                                            type="audio/mp3"
                                        />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                ) : (
                                    <span>Loading...</span>
                                )}
                            </td>
                            <td>
                                {/* Display the price if available */}
                                {song.price ? song.price : '0'} ETH
                            </td>
                            <td>
                                {/* Add purchase button */}
                                <button onClick={() => handlePurchaseSong(song.songID, song.price)}>
                                    Purchase Song
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplaySongs;
