// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import UserManagement from './components/UserManagement';
import DisplaySong from './components/DisplaySong';
import UploadMusic from './components/UploadMusic';
import DonateArtist from './components/DonateArtist';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserManagement />} />
                    <Route path="/dashboard" element={<DisplaySong />} />
                    <Route path="/upload" element={<UploadMusic />} />
                    <Route path="/payment" element={<DonateArtist />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
