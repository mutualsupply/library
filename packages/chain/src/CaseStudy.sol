// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "solmate/tokens/ERC721.sol";
import "openzeppelin/access/Ownable.sol";
import "./interfaces/IRenderer.sol";
import "./interfaces/IMetadata.sol";



contract CaseStudy is ERC721, Ownable {

    IRenderer public renderer;

    constructor(IRenderer _renderer) ERC721("MUTUAL LIBRARY", "LIB") {
        renderer = _renderer;
    }

    function tokenURI(uint256 id) override public view returns (string memory) {
        return renderer.tokenURI(id);
    }

    function setRenderer(IRenderer _renderer) public onlyOwner {
        renderer = _renderer;
    }
}
