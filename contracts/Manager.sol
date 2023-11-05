// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "./ERC20.sol";
import {Auth} from "./Auth.sol";


contract Manager {

    event TokenCreated(address indexed creator, address indexed tokenAddress);
    event TokensTransferred(address indexed tokenAddress, address indexed to, uint256 amount);

    Auth public immutable auth;
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
        auth = new Auth();
    }

    function createToken(string memory name, string memory symbol) external returns (address){

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
        require(auth.isUserLoggedIn() == true, "User not logged in or registered.");
        ClaimInfo memory info = ClaimInfo({
            user : msg.sender,
            tokenAddress : _tokenAddress,
            cid : _cid
        });

        claimInfo[msg.sender] = info;
    }

    function getTokens() public {
        ClaimInfo memory info = claimInfo[msg.sender];
        transferTokens(info.tokenAddress, msg.sender, 10);
    }
}
