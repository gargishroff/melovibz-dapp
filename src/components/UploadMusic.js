// // src/components/UploadMusic.js
// import React, { useRef } from 'react';
// import useApp from '../utils/useApp';

// function UploadMusic() {
//     const { uploadMusic, isRegistered } = useApp();
//     const fileInputRef = useRef(null);

//     const handleFileUpload = async () => {
//         if (fileInputRef.current.files.length === 0) {
//             alert("Please select a file to upload.");
//             return;
//         }

//         const file = fileInputRef.current.files[0];
//         try {
//             await uploadMusic(file);
//             alert("File uploaded successfully!");
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             alert("Failed to upload file.");
//         }
//     };

//     return (
//         <div>
//             <input type="file" ref={fileInputRef} accept="audio/*" />
//             <br />
//             <button onClick={handleFileUpload} className="btn btn-primary mt-2">Upload Music</button>
//         </div>
//     );
// }

// export default UploadMusic;

// src/components/UploadMusic.js
import React, { useState, useRef } from 'react';
import useApp from '../utils/useApp';
import './UploadMusic.css';

function UploadMusic() {
    const { uploadMusic } = useApp();
    const fileInputRef = useRef(null);
    const [songName, setSongName] = useState('')

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
            await uploadMusic(file, songName);
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
            <input type="file" ref={fileInputRef} accept="audio/*" className="file-input" />
            <button onClick={handleFileUpload} className="btn">Upload Music</button>
        </div>
    );
}

export default UploadMusic;
