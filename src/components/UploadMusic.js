// src/components/UploadMusic.js
import React, { useState, useRef } from 'react';
import useApp from '../utils/useApp';
import './UploadMusic.css';

function UploadMusic() {
    const { uploadMusic, isRegistered } = useApp();
    const fileInputRef = useRef(null);
    const [songName, setSongName] = useState(''); // State to hold the song name input
    const [songPrice, setSongPrice] = useState(''); // State to hold the song price input

    const handleFileUpload = async () => {
        if (fileInputRef.current.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        if (!songName.trim()) {
            alert("Please enter a song name.");
            return;
        }
        if (!songPrice || isNaN(songPrice) || Number(songPrice) <= 0) {
            alert("Please enter a valid song price.");
            return;
        }

        const file = fileInputRef.current.files[0];
        try {
            // Pass file, song name, and song price to the uploadMusic function
            await uploadMusic(file, songName, songPrice);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Song</h2>
            <input type="text" placeholder="Enter Song Name" value={songName} onChange={(e) => setSongName(e.target.value)} className="input-field" />
            <input type="number" placeholder='Enter Song Price (in ETH)' value={songPrice} onChange={(e) => setSongPrice(e.target.value)} className="input-field"/>
            <input type="file" ref={fileInputRef} accept="audio/*" className="file-input" />
            <button onClick={handleFileUpload} className="btn">Upload Music</button>
        </div>
    );
}

export default UploadMusic;
