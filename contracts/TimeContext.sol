 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeContext {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function getCurrentHour() public view returns (uint) {
        return (block.timestamp / 60 / 60) % 24;
    }
}
