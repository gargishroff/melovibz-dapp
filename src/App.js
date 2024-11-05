// // src/App.js
// import React, { useEffect, useState } from 'react';
// import MelovibzService from './utils/MelovibzService';
// import AddArtistForm from './components/AddArtistForm';
// import ArtistList from './components/ArtistList';
// import UploadMusic from './components/UploadMusic';

// function App() {
//     const [account, setAccount] = useState('');
//     const [artists, setArtists] = useState([]);

//     // useEffect(() => {
//     //     async function loadBlockchainData() {
//     //         await MelovibzService.init();
//     //         const account = await MelovibzService.loadAccount();
//     //         setAccount(account);
//     //         loadArtists();
//     //     }
//     //     loadBlockchainData();
//     // }, []);

//     useEffect(() => {
//       async function loadBlockchainData() {
//           try {
//               // Ensure MetaMask is installed and connected
//               if (typeof window.ethereum === 'undefined') {
//                   console.error('MetaMask is not installed!');
//                   return;
//               }
  
//               // Initialize the service
//               await MelovibzService.init();
  
//               // Load the account
//               const account = await MelovibzService.loadAccount();
//               if (!account) {
//                   console.error('No account found!');
//                   return;
//               }
              
//               // Set the account state
//               setAccount(account);
//               loadArtists();
//           } catch (error) {
//               console.error('Error loading blockchain data:', error);
//           }
//         }
  
//         loadBlockchainData();
//     }, []);

//     const loadArtists = async () => {
//         const artistList = await MelovibzService.getArtistList();
//         setArtists(artistList);
//     };

//     const handleAddArtist = async (artistName) => {
//         await MelovibzService.addArtist(artistName);
//         loadArtists(); // Reload the list after adding
//     };

//     const handleFileUpload = () => {
//         console.log("File upload triggered");
//         // Add IPFS upload logic here
//     };

//     return (
//         <div className="container" style={{ width: '650px' }}>
//             <h1 className="text-center">Melovibz - Artist Management</h1>
//             <hr />
//             <br />
//             <p id="accountAddress" className="text-center">Your Account: {account}</p>
//             <h3>Add New Artist</h3>
//             <AddArtistForm addArtist={handleAddArtist} />
//             <br />
//             <UploadMusic handleFileUpload={handleFileUpload} />
//             <hr />
//             <ArtistList artists={artists} />
//         </div>
//     );
// }

// export default App;

// src/App.js
import React from 'react';
import './App.css';
import UserManagement from './components/UserManagement';
import UploadMusic from './components/UploadMusic';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Melovibz - Decentralized Music Platform</h1>
            </header>
            <main>
                <UserManagement />
                <UploadMusic />
            </main>
        </div>
    );
}

export default App;
