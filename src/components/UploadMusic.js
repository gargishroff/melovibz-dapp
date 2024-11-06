// src/components/UploadMusic.js
import React, { useState, useRef } from 'react';
import useApp from '../utils/useApp';

function UploadMusic() {
    const { uploadMusic, isRegistered } = useApp();
    const fileInputRef = useRef(null);
    const [songName, setSongName] = useState(''); // State to hold the song name input

    const handleFileUpload = async () => {
        if (fileInputRef.current.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        if (!songName.trim()) {
            alert("Please enter a song name.");
            return;
        }

        const file = fileInputRef.current.files[0];
        try {
            // Pass both file and song name to the uploadMusic function
            await uploadMusic(file, songName);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Enter Song Name" 
                value={songName} 
                onChange={(e) => setSongName(e.target.value)} 
                className="form-control" 
            />
            <br />
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="audio/*" 
                className="form-control" 
            />
            <br />
            <button onClick={handleFileUpload} className="btn btn-primary mt-2">Upload Music</button>
        </div>
    );
}

export default UploadMusic;
