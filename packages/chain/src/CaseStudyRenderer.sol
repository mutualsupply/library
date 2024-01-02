// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin/utils/Base64.sol";
import "openzeppelin/utils/Strings.sol";
import "./interfaces/ICaseStudyRenderer.sol";

contract CaseStudyRenderer is ICaseStudyRenderer {
    function uri(uint256 id) override public view returns (string memory) {
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

    // function svg(uint256 tokenId) public view returns (string memory) {
    //     (string[] memory colors, uint256[] memory colorIndexes) = checks.colors(tokenId);
    //     uint256 count = colors.length;
    //     bool isBlackCheck = colorIndexes[0] == 999;

    //     return string.concat(
    //         '<svg ',
    //             'viewBox="0 0 608 608" ',
    //             'fill="none" xmlns="http://www.w3.org/2000/svg" ',
    //             'style="width:100vw;height:100vh;background:#808080;margin:auto;"',
    //         '>',
    //             renderBackground(count, colors, isBlackCheck),
    //             renderChecks(count, isBlackCheck),
    //             renderDefs(tokenId),
    //         '</svg>'
    //     );
    // }

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
