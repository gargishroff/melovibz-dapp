// src/components/PurchaseSong.js
import React, { useState } from 'react';

const PurchaseSong = ({ contract, account }) => {
    const [songId, setSongId] = useState('');

    const handlePurchase = async (e) => {
        e.preventDefault();

        try {
            const song = await contract.methods.songs(songId).call();
            await contract.methods.purchaseSong(songId).send({ from: account, value: song.price });

            alert("Song purchased successfully!");
            setSongId('');
        } catch (error) {
            console.error("Error purchasing song: ", error);
        }
    };

    return (
        <div>
            <h2>Purchase a Song</h2>
            <form onSubmit={handlePurchase}>
                <input type="number" placeholder="Song ID" value={songId} onChange={(e) => setSongId(e.target.value)} required />
                <button type="submit">Purchase Song</button>
            </form>
        </div>
    );
};

export default PurchaseSong;
