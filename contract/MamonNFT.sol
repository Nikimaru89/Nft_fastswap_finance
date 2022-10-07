// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MamonNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string baseURI;

    uint256 public totalMinted;
    uint256 public maxSupply = 4005;
    uint256 public price = 0.15 ether;
    address public admin = 0x27802573Cd86343a8065368B0F64a2F371B73280;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory baseURI_
    ) ERC721(_name, _symbol) {
        baseURI = baseURI_;
    }

    function mint(uint256 cnt) external payable {
        require(totalMinted + cnt <= maxSupply, "Max supply exceeds");
        require(msg.value >= cnt * price, "Insufficient funds");
        payable(admin).transfer(address(this).balance);
        for (uint256 i = 0; i < cnt; i++) {
            _safeMint(msg.sender, totalMinted + 1);
            totalMinted++;
        }
    }

    function setBaseURI(string memory baseURI_) external {
        baseURI = baseURI_;
    }

    function setAdmin(address _addr) external onlyOwner {
        admin = _addr;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }
}
