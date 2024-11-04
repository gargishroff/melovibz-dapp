// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MusicPlatform {
    struct Song {
        uint id;
        address payable artist;
        string title;
        string ipfsHash;
        uint price;
        bool isAvailable;
    }

    mapping(uint => Song) public songs;
    uint public songCount;

    // Event emitted when a song is uploaded
    event SongUploaded(uint id, address artist, string title, string ipfsHash, uint price);
    // Event emitted when a song is purchased
    event SongPurchased(uint id, address buyer);

    function uploadSong(string memory _title, string memory _ipfsHash, uint _price) public {
        songCount++;
        songs[songCount] = Song(songCount, payable(msg.sender), _title, _ipfsHash, _price, true);
        emit SongUploaded(songCount, msg.sender, _title, _ipfsHash, _price);
    }

    function purchaseSong(uint _id) public payable {
        Song storage song = songs[_id];
        require(msg.value == song.price, "Please send the exact price");
        require(song.isAvailable, "Song is not available");

        song.artist.transfer(msg.value);
        emit SongPurchased(_id, msg.sender); // Emit purchase event
    }
}


