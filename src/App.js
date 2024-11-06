// src/App.js
import React from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import UploadMusic from './components/UploadMusic';
import DonateArtist from './components/DonateArtist';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Melovibz - Decentralized Music Platform</h1>
            </header>
            <main>
                <UserManagement />
                <UploadMusic />
                <DonateArtist />
            </main>
        </div>
    );
}

export default App;
