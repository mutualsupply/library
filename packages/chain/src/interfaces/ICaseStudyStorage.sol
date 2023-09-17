// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ICaseStudyStorage {
  function getSource(uint256 tokenId) external view returns (string memory);
  function getTitle(uint256 tokenId) external view returns (string memory);
  function getSlug(uint256 tokenId) external view returns (string memory);
  function setSource(uint256 tokenId, string memory _source) external;
  function setTitle(uint256 tokenId, string memory _source) external;
  function setSlug(uint256 tokenId, string memory _source) external;
}
