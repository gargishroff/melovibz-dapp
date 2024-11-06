// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faPlay, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'; // Import music-related icons
import './Layout.css';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <img src={logo} alt="MusicChain Logo" className="sidebar-logo" />
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/upload">Upload Songs</Link></li>
                        <li><Link to="/payment">Make Payments</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
            <header className="navbar">
                <h2 className="navbar-text">
                    <FontAwesomeIcon icon={faMusic} className="icon-music" />
                    Decentralized Music Streaming Platform - Play, Pay & Publish
                    <FontAwesomeIcon icon={faPlay} className="icon-music" />
                    <FontAwesomeIcon icon={faMoneyBillWave} className="icon-music" />
                </h2>
            </header>
                {children}
            </main>
        </div>
    );
};

export default Layout;
