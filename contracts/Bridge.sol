// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Bridge {
    uint256 value;

    event ValueUpdated(address indexed setter, uint256 indexed newValue, uint256 timestamp, uint256 indexed chainId);

    event ValueRetrieved(address indexed getter, uint256 indexed value, uint256 timestamp, uint256 indexed chainId);

    function getValue() public returns (uint256) {
        emit ValueRetrieved(msg.sender, value, block.timestamp, block.chainid);
        return value;
    }

    function setValue(uint256 _newValue) external {
        value = _newValue;
        emit ValueUpdated(msg.sender, _newValue, block.timestamp, block.chainid);
    }
}

// 0xb9e1b2dd10f188f6cb022509c02964c0277a15b708a87553d28d404f4f260fb4
