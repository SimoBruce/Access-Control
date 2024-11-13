pragma solidity ^0.8.0;

contract AccessControl {
    mapping(address => string) private roles;

    // Debugging event
    event Debug(string message);

    constructor() {
        emit Debug("Constructor started");
        
        // Perform initial setup
        roles[msg.sender] = "admin";
        emit Debug("Admin role assigned to deployer");
        
        // Add more initialization code if needed
        // For example:
        // require(initializationFunction(), "Initialization failed");
        
        emit Debug("Constructor completed");
    }

    function assignRole(address user, string memory role) public {
        roles[user] = role;
    }

    function getRole(address user) public view returns (string memory) {
        return roles[user];
    }
}
