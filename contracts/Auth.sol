// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {
    struct User {
        string email;
        bytes32 passwordHash;
        bool registered;
    }

    mapping(address => User) private users;

    event UserRegistered(address user, string email);
    event LoginSuccessful(address user);

    function register(string memory _email, string memory _password) public {
        require(!users[msg.sender].registered, "User already registered");

        users[msg.sender] = User({
            email: _email,
            passwordHash: keccak256(abi.encodePacked(_password)),
            registered: true
        });

        emit UserRegistered(msg.sender, _email);
    }

    function login(string memory _password) public view returns (bool) {
        require(users[msg.sender].registered, "User not registered");

        if (users[msg.sender].passwordHash == keccak256(abi.encodePacked(_password))) {
            return true;
        } else {
            return false;
        }
    }
}
