pragma solidity >=0.4.22 <0.9.0;

contract Melovibz {

    uint256 public number_of_users;

    mapping(address => User) public allUsers;
    mapping(string => address) public userAddressesByName;
    address[] public userAddresses;

    constructor() public {
        number_of_users = 0;
    }

    struct User {
        string name;
        uint256 userID;
        uint256[] songsPublished;
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
    

}
