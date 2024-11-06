// src/App.js
import React from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import UploadMusic from './components/UploadMusic';
import DonateArtist from './components/DonateArtist';
import DisplaySongs from './components/DisplaySong';

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
                <DisplaySongs />
            </main>
        </div>
    );
}

export default App;
