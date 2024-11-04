// src/components/SongList.js
import React, { useEffect, useState } from 'react';

const SongList = ({ contract }) => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const songCount = await contract.methods.songCount().call();
            const songList = [];

            for (let i = 1; i <= songCount; i++) {
                const song = await contract.methods.songs(i).call();
                songList.push(song);
            }

            setSongs(songList);
        };

        fetchSongs();
    }, [contract]);

    return (
        <div>
            <h2>Available Songs</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <strong>{song.title}</strong> - {song.price / 1e18} ETH
                        <br />
                        <a href={`https://ipfs.infura.io/ipfs/${song.ipfsHash}`} target="_blank" rel="noopener noreferrer">Listen</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;
