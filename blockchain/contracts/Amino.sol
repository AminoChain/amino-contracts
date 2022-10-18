pragma solidity ^0.8.7;

contract Amino  {
    event UserRegistered(address user);

    function registerUser() public {
        emit UserRegistered(msg.sender);
    }
}