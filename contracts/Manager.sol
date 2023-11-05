// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "./ERC20.sol";

contract Manager {
    event TokenCreated(address indexed creator, address indexed tokenAddress);
    event TokensTransferred(address indexed tokenAddress, address indexed to, uint256 amount);

    address public immutable owner;

    struct ClaimInfo {
        address user;
        address tokenAddress;
        string cid;
    }

    mapping(address user => ClaimInfo userClaim) public claimInfo;

    address[] public tokenPool;

    constructor() {
        owner = msg.sender;
    }

    function createToken(string memory name, string memory symbol) external returns (address) {
        require(msg.sender == owner, "Unauthorized");

        ERC20 newTokenAddress = new ERC20(name, symbol, address(this));
        tokenPool.push(address(newTokenAddress));

        emit TokenCreated(msg.sender, address(newTokenAddress));
        return address(newTokenAddress);
    }

    function transferTokens(address tokenAddress, address to, uint256 amount) public {
        ERC20 token = ERC20(tokenAddress);
        token.transfer(to, amount);

        emit TokensTransferred(tokenAddress, to, amount);
    }

    function uploadImage(string memory _cid, address _tokenAddress) public {
        ClaimInfo memory info = ClaimInfo({user: msg.sender, tokenAddress: _tokenAddress, cid: _cid});

        claimInfo[msg.sender] = info;
    }

    function getTokens() public {
        ClaimInfo memory info = claimInfo[msg.sender];
        transferTokens(info.tokenAddress, msg.sender, 10);
    }
}
