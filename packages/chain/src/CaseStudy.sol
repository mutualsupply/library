// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC1155} from "solmate/tokens/ERC1155.sol";
import "openzeppelin/access/Ownable.sol";
import "./interfaces/ICaseStudyRenderer.sol";
import "./interfaces/ICaseStudyStorage.sol";

contract CaseStudy is ERC1155, Ownable {

    address public renderer;
    address public store;

    struct NewCaseStudy {
        string source;
        string title;
        string slug;
    }

    constructor(address _renderer) {
        renderer = _renderer;
    }

    function setNewToken(address to, NewCaseStudy memory caseStudy) public {
        // TODO: get next ID here
        // uint256 id = totalSupply() + 1;

        uint256 id = 20;

        ICaseStudyStorage storeContract = ICaseStudyStorage(store);
        storeContract.setSource(id, caseStudy.source);
        storeContract.setTitle(id, caseStudy.title);
        storeContract.setSlug(id, caseStudy.slug);

        _mint(to, id, 1, "");
    }

    function uri(uint256 id) override public view returns (string memory) {
        return ICaseStudyRenderer(renderer).uri(id);
    }

    function setRenderer(address _renderer) public onlyOwner {
        renderer = _renderer;
    }

    function setStore(address _store) public onlyOwner {
        store = _store;
    }
}
