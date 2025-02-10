// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./TokenERC20.sol";

contract TokenERC20Factory is Ownable, ReentrancyGuard {
    address public immutable tokenImplementation;

    struct TokenInfo {
        address tokenAddress;
        string name;
        string symbol;
        uint256 totalSupply;
        address owner;
    }

    mapping(bytes32 => address) private tokenBySymbol;
    TokenInfo[] private allTokens;

    event TokenCreated(address indexed tokenAddress, string name, string symbol, uint256 totalSupply, address owner);
    event TokenRemoved(address indexed tokenAddress, string name, string symbol, address owner);

    constructor(address _implementation) Ownable(msg.sender) {
        require(_implementation != address(0), "Invalid implementation address");
        require(_isContract(_implementation), "Implementation must be a contract");
        tokenImplementation = _implementation;
    }

    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _owner
    ) external nonReentrant returns (address) {
        require(bytes(_name).length > 0, "Token name is required");
        require(bytes(_symbol).length > 0, "Token symbol is required");
        require(_totalSupply > 0, "Total supply must be greater than zero");
        
        bytes32 symbolHash = keccak256(abi.encodePacked(_symbol));
        require(tokenBySymbol[symbolHash] == address(0), "Token with this symbol already exists");

        address proxyToken = Clones.clone(tokenImplementation);
        TokenERC20(proxyToken).initialize(_name, _symbol, _totalSupply, _owner);

        tokenBySymbol[symbolHash] = proxyToken;
        allTokens.push(TokenInfo(proxyToken, _name, _symbol, _totalSupply, _owner));

        emit TokenCreated(proxyToken, _name, _symbol, _totalSupply, _owner);

        return proxyToken;
    }

    function removeToken(string memory _symbol) external onlyOwner {
        bytes32 symbolHash = keccak256(abi.encodePacked(_symbol));
        address tokenAddress = tokenBySymbol[symbolHash];
        require(tokenAddress != address(0), "Token does not exist");

        for (uint256 i = 0; i < allTokens.length; i++) {
            if (allTokens[i].tokenAddress == tokenAddress) {
                emit TokenRemoved(allTokens[i].tokenAddress, allTokens[i].name, allTokens[i].symbol, allTokens[i].owner);
                
                allTokens[i] = allTokens[allTokens.length - 1];
                allTokens.pop();
                break;
            }
        }

        delete tokenBySymbol[symbolHash];
    }

    function getAllTokens() external view returns (TokenInfo[] memory) {
        return allTokens;
    }

    function getTokenBySymbol(string memory _symbol) external view returns (address) {
        return tokenBySymbol[keccak256(abi.encodePacked(_symbol))];
    }

    function getTokenCount() external view returns (uint256) {
        return allTokens.length;
    }

    function _isContract(address account) private view returns (bool) {
        return account.code.length > 0;
    }
}
