// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swapper {
    mapping(address => uint256) public tokenPrices; // Mapping of token addresses to their respective exchange rates
    mapping(address => uint256) public userBalances; // Mapping of user addresses to their ether balances

    event TokensSwapped(address indexed user, address indexed tokenAddress, uint256 tokensAmount, uint256 etherAmount);

    function setTokenPrice(address tokenAddress, uint256 price) external {
        tokenPrices[tokenAddress] = price * 1 ether;
    }

    function swapTokensForEther(address tokenAddress, uint256 tokensAmount) external {
        require(tokenPrices[tokenAddress] > 0, "Token not supported");

        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(msg.sender) >= tokensAmount, "Insufficient tokens");
        require(token.allowance(msg.sender, address(this)) >= tokensAmount, "Allowance too low");

        uint256 etherAmount = (tokensAmount * tokenPrices[tokenAddress]) / 1 ether;
        require(etherAmount > 0, "Invalid exchange rate");

        token.transferFrom(msg.sender, address(this), tokensAmount);
        userBalances[msg.sender] += etherAmount;

        emit TokensSwapped(msg.sender, tokenAddress, tokensAmount, etherAmount);
    }

    function withdrawEther() external {
        uint256 balance = userBalances[msg.sender];
        require(balance > 0, "No ether to withdraw");

        userBalances[msg.sender] = 0;
        payable(msg.sender).transfer(balance * 1 ether);
    }

    receive() external payable {}
    fallback() external payable {}
}
