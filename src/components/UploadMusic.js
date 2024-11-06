// src/components/UploadMusic.js
import React, { useRef } from 'react';
import useApp from '../utils/useApp';

function UploadMusic() {
    const { uploadMusic, isRegistered } = useApp();
    const fileInputRef = useRef(null);

    const handleFileUpload = async () => {
        if (fileInputRef.current.files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        const file = fileInputRef.current.files[0];
        try {
            await uploadMusic(file);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} accept="audio/*" />
            <br />
            <button onClick={handleFileUpload} className="btn btn-primary mt-2">Upload Music</button>
        </div>
    );
}

export default UploadMusic;
