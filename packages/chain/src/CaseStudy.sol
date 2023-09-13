// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC1155} from "solmate/tokens/ERC1155.sol";

contract CaseStudy is ERC1155 {

    constructor() {}

    function uri(uint256 id) override public view returns (string memory) {
        return "https://example.com";
    }
}
