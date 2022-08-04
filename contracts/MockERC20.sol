// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract mockToken is ERC20 {
    uint256 private constant _INITIAL_SUPPLY = 10000000000 * (10**18);
    uint8 private decim;

    constructor(
        string memory _name,
        string memory _sybmol,
        uint256 _mintAmount
    ) ERC20(_name, _sybmol) {
        _mint(msg.sender, _mintAmount);
    }

    
}
