// Import the contract artifact
const MusicPlatform = artifacts.require("MusicPlatform");

module.exports = function (deployer) {
  // Deploy the MusicPlatform contract
  deployer.deploy(MusicPlatform);
};
