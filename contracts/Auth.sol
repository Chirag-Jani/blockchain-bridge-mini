// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Auth {
    mapping(address => bool) public isRegistered;
    mapping(address => bool) isLoggedIn;

    event UserRegistered(address indexed userAddress);
    event UserLoggedIn(address indexed userAddress);

    function register() public {
        require(!isRegistered[msg.sender], "User already registered");
        isRegistered[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function loginAndLogout() public {
        require(isRegistered[msg.sender], "User not registered");
        bool currentState = isLoggedIn[msg.sender];
        isLoggedIn[msg.sender] = !currentState;
        emit UserLoggedIn(msg.sender);
    }

    function isUserLoggedIn() public view returns (bool) {
        return isLoggedIn[msg.sender];
    }
}
