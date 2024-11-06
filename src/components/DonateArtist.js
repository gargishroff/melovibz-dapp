// // src/components/donateArtist.js
// import React from 'react';
// import useApp from '../utils/useApp'; // Adjust the path if necessary

// const DonateArtist = () => {
//     const {
//         artistName,
//         setArtistName,
//         donationAmount,
//         setDonationAmount,
//         donateToArtist,
//         userStatusMessage,
//     } = useApp();

//     const handleDonation = (e) => {
//         e.preventDefault(); // Prevent default form submission
//         donateToArtist(); // Call the donation function from useApp
//     };

//     return (
//         <div className="donate-artist-container">
//             <h2>Donate to Artist</h2>
//             <form onSubmit={handleDonation}>
//                 <div>
//                     <label htmlFor="artistName">Artist Name:</label>
//                     <input
//                         type="text"
//                         id="artistName"
//                         value={artistName}
//                         onChange={(e) => setArtistName(e.target.value)}
//                         placeholder="Enter artist name"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="donationAmount">Donation Amount (ETH):</label>
//                     <input
//                         type="number"
//                         id="donationAmount"
//                         value={donationAmount}
//                         onChange={(e) => setDonationAmount(e.target.value)}
//                         placeholder="Enter amount"
//                         min="0.01" // Set a minimum value for donation
//                         step="0.01" // Allow decimal values
//                         required
//                     />
//                 </div>
//                 <button type="submit">Donate</button>
//             </form>
//             {userStatusMessage && <p>{userStatusMessage}</p>} {/* Display status messages */}
//         </div>
//     );
// };

// export default DonateArtist;


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
    } = useApp();

    const handleDonation = (e) => {
        e.preventDefault(); // Prevent default form submission
        donateToArtist(); // Call the donation function from useApp
        setArtistName(''); // Clear artist name
        setDonationAmount(''); // Clear donation amount
    };

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
