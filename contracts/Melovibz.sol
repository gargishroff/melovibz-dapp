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
        number_of_users += 1;
        User memory newUser;
        newUser.name = _name;
        newUser.userID = number_of_users;
        allUsers[msg.sender] = newUser;
        userAddresses.push(msg.sender);
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

    // function donateArtist(string memory artistName) public payable {
    //     require(
    //         msg.sender.balance > msg.value,
    //         "Insufficient balance to proceed."
    //     );

    //     getuserAddresses[artistName].transfer(msg.value);

    //     emit artistDonated(
    //         artistName,
    //         allListeners[msg.sender].name,
    //         msg.value
    //     );
    // }

}
