// src/components/UploadMusic.js
import React from 'react';

function UploadMusic({ handleFileUpload }) {
    return (
        <div>
            <input type="file" id="fileInput" accept="audio/*" />
            <br />
            <button onClick={handleFileUpload} className="btn btn-primary mt-2">Upload Music</button>
        </div>
    );
}

export default UploadMusic;
