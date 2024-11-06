pragma solidity >=0.4.22 <0.9.0;

contract Melovibz {

    uint256 public number_of_users;
    uint256 public number_of_songs;
    uint256 public listenThreshold = 2;

    mapping(address => User) public allUsers;
    mapping(string => address) public userAddressesByName;
    mapping(uint256 => Song) public songs;
    mapping(uint256 => mapping(address => uint256)) public songListenCountByUser; // Track number of listens per user for each song
    mapping(uint256 => mapping(address => bool)) public songPurchasedByUser; // Track if a user has purchased the song
    address[] public userAddresses;
    uint256[] public allSongIds; // Array to store all song IDs

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
        string owner;
        string song_name;
        uint256 price;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
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
    event SongPurchased(address indexed buyer, uint256 songID, uint256 price);

    function donateArtist(address artistAddress) public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");
        require(artistAddress != address(0), "Invalid artist address");

        // Perform the donation logic, e.g., transferring ETH to the artist
        payable(artistAddress).transfer(msg.value);

        // Emit the DonationMade event with the artist's address
        emit DonationMade(artistAddress, msg.sender, msg.value);
    }

    function publishSong(string memory song_name,uint256 price,string memory _ipfsHash) public {
        require(allUsers[msg.sender].userID != 0, "User not registered."); // Ensure user is registered

        for (uint i = 0; i < allUsers[msg.sender].songsPublished.length; i++) {
            uint256 songId = allUsers[msg.sender].songsPublished[i];
            if (keccak256(bytes(songs[songId].ipfsHash)) == keccak256(bytes(_ipfsHash))) {
                revert("Song already uploaded by this user.");
            }
        }

        number_of_songs += 1;
        string memory name = get_user_name(msg.sender);
        songs[number_of_songs] = Song(number_of_songs, _ipfsHash,name,song_name,price);
        allSongIds.push(number_of_songs);

        // Associate the song with the user
        allUsers[msg.sender].songsPublished.push(number_of_songs);
    }

    function getAllSongs() public view returns (Song[] memory) {
        Song[] memory allSongs = new Song[](allSongIds.length);

        for (uint256 i = 0; i < allSongIds.length; i++) {
            uint256 songId = allSongIds[i];
            allSongs[i] = songs[songId]; // Retrieve the Song object using the songId
        }

        return allSongs;
    }

    function isCurrentUserOwner(uint256 songID, string memory currentUser) public view returns (bool) {
        // Fetch the song using songID
        Song memory song = songs[songID];
        
        // Compare the owner's name with the current user
        return compareStrings(song.owner, currentUser);
    }

    function listenToSong(uint256 songID) public {
        require(songs[songID].songID != 0, "Song does not exist");

        // Increment the listen count for the user for this song
        songListenCountByUser[songID][msg.sender] += 1;
        string memory curr_user_name=get_user_name(msg.sender);
        // If the listen count exceeds the threshold and the user is not the owner, they must purchase the song
        if (songListenCountByUser[songID][msg.sender] > listenThreshold && !isCurrentUserOwner(songID,curr_user_name) && !songPurchasedByUser[songID][msg.sender])
        {
            revert("You need to purchase this song after listening more than the threshold.");
        }
    }

    function purchaseSong(uint256 songID) public payable {
        require(songs[songID].songID != 0, "Song does not exist");
        require(msg.value >= songs[songID].price, "Not enough Ether to purchase the song");
        require(!songPurchasedByUser[songID][msg.sender], "You have already purchased this song");
        string memory curr_user_name=get_user_name(msg.sender);
        require(!isCurrentUserOwner(songID,curr_user_name));
        // Mark the song as purchased by the user
        songPurchasedByUser[songID][msg.sender] = true;

        // Transfer the payment to the artist
        address artistAddress = userAddressesByName[songs[songID].owner];
        payable(artistAddress).transfer(msg.value);

        emit SongPurchased(msg.sender, songID, msg.value);
    }

}