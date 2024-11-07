require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {

  // networks: {
  //   development: {
  //    host: "127.0.0.1",     // Localhost (default: none)
  //    port: 7545,            // Standard Ethereum port (default: none)
  //    network_id: "*"       // Any network (default: none)
  //   },
  //   develop: {
  //     port: 8545,
  //   },
  // },

  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, SEPOLIA_RPC_URL),
      network_id: 11155111,       // Sepolia's network id
      gas: undefined,              // Gas limit
      confirmations: 2,           // Number of confirmations to wait between deployments
      timeoutBlocks: 200,         // Timeout
      skipDryRun: true            // Skip dry run before migrations
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
