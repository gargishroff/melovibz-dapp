import React from 'react';
import useApp from '../utils/useApp'; // Adjust the path if necessary
import './DonateArtist.css'; // Import the CSS file for styling

const DonateArtist = () => {
    const {
        artistName,
        setArtistName,
        donationAmount,
        setDonationAmount,
        donateToArtist,
        userStatusMessage,
        isRegistered,
    } = useApp();

    const handleDonation = (e) => {
        e.preventDefault(); // Prevent default form submission
        donateToArtist(); // Call the donation function from useApp
        setArtistName(''); // Clear artist name
        setDonationAmount(''); // Clear donation amount
    };

    if (!isRegistered) return <div>Please register to make payments</div>;

    return (
        <div className="donate-artist-container">
            <h2>Make payments to your Favourite Artist</h2>
            <form onSubmit={handleDonation}>
                <input
                    type="text"
                    id="artistName"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Enter artist name"
                    className="input-field"
                    required
                />
                <input
                    type="number"
                    id="donationAmount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount (ETH)"
                    min="0.01"
                    step="0.01"
                    className="input-field"
                    required
                />
                <button type="submit" className="btn">Pay</button>
            </form>
            {userStatusMessage && <p>{userStatusMessage}</p>}
        </div>
    );
};

export default DonateArtist;
