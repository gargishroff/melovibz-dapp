# MeloVibz: Decentralized Music Streaming Platform - Play, Pay & Publish

MeloVibz is a blockchain-based music streaming web app that empowers artists and listeners through decentralization. Built on the Sepolia Testnet and integrated with IPFS for decentralized storage, the platform allows users to upload, stream, purchase, and donate for music directly on-chain. Artists can publish their work, users can buy or donate to support them, and every interaction—like listening or buying—is securely recorded on the blockchain.

## Steps of Execution 

To run the app follow the steps as mentioned below.

- Git clone the directory.

- In the main directory folder, run the following commands,
    - To deploy the blockchain on Sepolia Testnet
        ```
        npm run migrate 
        ```
    - To start the app
        ```
        npm start
        ```
- Once deployed the ``` \build\contracts```, contains the deployed contract files.


## Functionalities in the WebApp

### `addUser`
- This function adds a new user to the contract by calling the `add_new_user` method, if not registered already.

### `uploadMusic`
- This function uploads a music file to IPFS using the `uploadToPinata` utility function and  publishes the song on the blockchain by calling the `publishSong` method on the contract instance, passing the song name, price, and IPFS hash.

### `donateToArtist`
- This function allows the user to donate to an artist by calling the `donateArtist` method on the contract instance.

### `fetchAllSongs`
- This function fetches all the songs from the contract by calling the `getAllSongs` method and displays it to the user.

### `listenToSong`
- This function increments the listen count for a song by calling the `listenToSong` method on the contract instance and enables the user to listen to it.

### `purchaseSong`
- This function allows the user to purchase a song by calling the `purchaseSong` method on the contract instance, passing the song ID and the song price.
