// src/components/UploadSong.js
import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';

const client = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

const UploadSong = ({ contract, account }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return alert("Please upload a file.");

        try {
            const added = await client.add(file);
            const ipfsHash = added.path;
            const priceInWei = Web3.utils.toWei(price, 'ether');

            await contract.methods.uploadSong(title, ipfsHash, priceInWei).send({ from: account });

            alert("Song uploaded successfully!");
            setTitle('');
            setFile(null);
            setPrice('');
        } catch (error) {
            console.error("Error uploading song: ", error);
        }
    };

    return (
        <div>
            <h2>Upload a Song</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Song Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="file" onChange={handleFileChange} required />
                <input type="text" placeholder="Price in Ether" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <button type="submit">Upload Song</button>
            </form>
        </div>
    );
};

export default UploadSong;
