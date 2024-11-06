pragma solidity >=0.4.22 <0.9.0;

contract Melovibz {

    uint256 public number_of_users;
    uint256 public number_of_songs;

    mapping(address => User) public allUsers;
    mapping(string => address) public userAddressesByName;
    mapping(uint256 => Song) public songs;
    address[] public userAddresses;

    constructor() public {
        number_of_users = 0;
        number_of_songs = 0;
    }

    struct User {
        string name;
        uint256 userID;
        uint256[] songsPublished;
    }

    struct Song {
        uint256 songID;
        string ipfsHash;
        address owner;
    }

    function add_new_user(string memory _name) public {
        require(allUsers[msg.sender].userID == 0, "User already registered.");
        require(userAddressesByName[_name] == address(0), "Username already taken."); // Prevent duplicate names
        number_of_users += 1;
        User memory newUser;
        newUser.name = _name;
        newUser.userID = number_of_users;
        allUsers[msg.sender] = newUser;
        userAddresses.push(msg.sender);
        userAddressesByName[_name] = msg.sender;
    }

    function getuserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    function isUserRegistered(address user) public view returns (bool) {
        return allUsers[user].userID != 0;
    }

    function get_user_name(address user) public view returns (string memory) {
        return allUsers[user].name;
    }

    function getUserAddressByName(string memory _name) public view returns (address) {
        address artistAddress = userAddressesByName[_name];
        require(artistAddress != address(0), "Artist not found.");  // Ensure artist exists
        return artistAddress;
    }

    event DonationMade(address indexed artist, address indexed donor, uint256 amount);

    function donateArtist(address artistAddress) public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        require(artistAddress != address(0), "Invalid artist address");

        // Perform the donation logic, e.g., transferring ETH to the artist
        payable(artistAddress).transfer(msg.value);

        // Emit the DonationMade event with the artist's address
        emit DonationMade(artistAddress, msg.sender, msg.value);
    }

    // Function to publish a new song
    function publishSong(string memory _ipfsHash) public {
        require(allUsers[msg.sender].userID != 0, "User not registered."); // Ensure user is registered

        // Check if the song already exists by its IPFS hash for this user
        for (uint i = 0; i < allUsers[msg.sender].songsPublished.length; i++) {
            uint256 songId = allUsers[msg.sender].songsPublished[i];
            if (keccak256(bytes(songs[songId].ipfsHash)) == keccak256(bytes(_ipfsHash))) {
                revert("Song already uploaded by this user.");
            }
        }

        // Increment song counter and create a new song
        number_of_songs += 1;
        songs[number_of_songs] = Song(number_of_songs, _ipfsHash, msg.sender);

        // Associate the song with the user
        allUsers[msg.sender].songsPublished.push(number_of_songs);
    }
    
    // Function to get a user's songs
    function getUserSongs(address user) public view returns (uint256[] memory) {
        return allUsers[user].songsPublished;
    }

    // Function to get song details by ID
    function getSong(uint256 songID) public view returns (uint256, string memory, address) {
        require(songID <= number_of_songs && songID > 0, "Song does not exist.");
        Song memory song = songs[songID];
        return (song.songID, song.ipfsHash, song.owner);
    }

}
