// src/services/MelovibzService.js
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import MelovibzArtifact from './contracts/Melovibz.json'; // Adjust the path if necessary

class MelovibzService {
  constructor() {
    this.web3Provider = null;
    this.contracts = {};
    this.account = '0x0';
    this.web3 = null;
  }

  async init() {
    await this.initWeb3();
    await this.initContract();
    this.account = await this.loadAccount();
  }

  async initWeb3() {
    if (window.ethereum) {
      this.web3Provider = window.ethereum;
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        this.web3 = new Web3(this.web3Provider);
      } catch (error) {
        console.error("User denied account access");
      }
    } else if (window.web3) {
      this.web3Provider = window.web3.currentProvider;
      this.web3 = new Web3(this.web3Provider);
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      this.web3 = new Web3(this.web3Provider);
    }
  }

  async initContract() {
    this.contracts.Melovibz = TruffleContract(MelovibzArtifact);
    this.contracts.Melovibz.setProvider(this.web3Provider);
  }

//   async loadAccount() {
//     const accounts = await this.web3.eth.getAccounts();
//     this.account = accounts[0];
//     return this.account;
//   }

    async loadAccount() {
    if (!this.web3) {
      throw new Error('Web3 is not initialized');
    }
    const accounts = await this.web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }
    this.account = accounts[0];
    return this.account;
  }

//   async getArtistList() {
//     const instance = await this.contracts.Melovibz.deployed();
//     const artistAddresses = await instance.getArtistAddresses();

//     const artistDetails = await Promise.all(
//       artistAddresses.map(async (address) => {
//         const artist = await instance.getArtistDetails({ from: address });
//         return {
//           name: artist[0],
//           id: artist[1],
//           songs: artist[2].length > 0 ? artist[2].join(", ") : "No songs"
//         };
//       })
//     );

//     return artistDetails;
//   }

async getArtistList() {
    try {
      const instance = await this.contracts.Melovibz.deployed();
      const artistAddresses = await instance.getArtistAddresses();

      const artistDetails = await Promise.all(
        artistAddresses.map(async (address) => {
          const artist = await instance.getArtistDetails({ from: address });
          return {
            name: artist[0],
            id: artist[1],
            songs: artist[2].length > 0 ? artist[2].join(", ") : "No songs"
          };
        })
      );

      return artistDetails;
    } catch (error) {
      console.error("Error getting artist list:", error);
      throw new Error('Failed to fetch artist list');
    }
}

//   async addArtist(artistName) {
//     const instance = await this.contracts.Melovibz.deployed();
//     await instance.add_new_artist(artistName, { from: this.account });
//   }
async addArtist(artistName) {
    try {
      const instance = await this.contracts.Melovibz.deployed();
      await instance.add_new_artist(artistName, { from: this.account });
    } catch (error) {
      console.error("Error adding artist:", error);
      throw new Error('Failed to add artist');
    }
  }

}

const melovibzService = new MelovibzService();
export default melovibzService;
// export default new MelovibzService();
