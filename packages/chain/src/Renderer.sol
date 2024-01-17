// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin/utils/Base64.sol";
import "openzeppelin/utils/Strings.sol";
import "./interfaces/ICaseStudyRenderer.sol";
import "openzeppelin/access/Ownable.sol";

contract CaseStudyRenderer is ICaseStudyRenderer, Ownable {
    function tokenURI(uint256 id) public view returns (string memory) {
      return string.concat(
          "data:application/json;base64,",
          Base64.encode(abi.encodePacked(renderMetadata(id)))
      );
    }

    function renderMetadata(uint256 tokenId) private view returns (string memory) {
        string memory id = Strings.toString(tokenId);
        // string memory img = string.concat('"data:image/svg+xml;base64,', Base64.encode(abi.encodePacked(svg(tokenId))));
        string memory description = string.concat('MUTUAL Design Case Study',id);
        return string.concat(
            '{',
                '"name": "MUTUAL Design Case Study #',id,'",',
                '"description": "',description,'",',
                '"image": "https://api.checks.art/checks/',id,'/pfp.png",',
                // '"svg": ',img,'",',
                // '"animation_url": ',img,'",',
                '"attributes": [', attributes(tokenId), ']',
            '}'
        );
    }

    function attributes(uint256 tokenId) private pure returns (string memory) {
        return string.concat(
            'yes'
        );
    }

    function trait(
        string memory traitType, string memory traitValue, string memory append
    ) private pure returns (string memory) {
        return string(abi.encodePacked(
            '{',
                '"trait_type": "', traitType, '",'
                '"value": "', traitValue, '"'
            '}',
            append
        ));
    }
}
