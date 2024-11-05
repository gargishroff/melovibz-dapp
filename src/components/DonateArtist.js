// src/components/donateArtist.js
import React from 'react';
import useApp from '../utils/useApp'; // Adjust the path if necessary

const DonateArtist = () => {
    const {
        artistName,
        setArtistName,
        donationAmount,
        setDonationAmount,
        donateToArtist,
        userStatusMessage,
    } = useApp();

    const handleDonation = (e) => {
        e.preventDefault(); // Prevent default form submission
        donateToArtist(); // Call the donation function from useApp
    };

    return (
        <div className="donate-artist-container">
            <h2>Donate to Artist</h2>
            <form onSubmit={handleDonation}>
                <div>
                    <label htmlFor="artistName">Artist Name:</label>
                    <input
                        type="text"
                        id="artistName"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Enter artist name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="donationAmount">Donation Amount (ETH):</label>
                    <input
                        type="number"
                        id="donationAmount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="0.01" // Set a minimum value for donation
                        step="0.01" // Allow decimal values
                        required
                    />
                </div>
                <button type="submit">Donate</button>
            </form>
            {userStatusMessage && <p>{userStatusMessage}</p>} {/* Display status messages */}
        </div>
    );
};

export default DonateArtist;
