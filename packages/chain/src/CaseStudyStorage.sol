// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "openzeppelin/access/Ownable.sol";
import "./interfaces/ICaseStudyStorage.sol";

contract CaseStudyStorage is ICaseStudyStorage, Ownable {
  mapping(uint256 => string) public source;
  mapping(uint256 => string) public title;
  mapping(uint256 => string) public slug;

  function getSource(uint256 tokenId) public view returns (string memory) {
    return source[tokenId];
  }

  function getSlug(uint256 tokenId) public view returns (string memory) {
    return slug[tokenId];
  }

  function getTitle(uint256 tokenId) public view returns (string memory) {
    return title[tokenId];
  }

  function setSource(uint256 tokenId, string memory _source) public onlyOwner {
    source[tokenId] = _source;
  }

  function setTitle(uint256 tokenId, string memory _title) public onlyOwner {
    title[tokenId] = _title;
  }

  function setSlug(uint256 tokenId, string memory _slug) public onlyOwner {
    slug[tokenId] = _slug;
  }
}
