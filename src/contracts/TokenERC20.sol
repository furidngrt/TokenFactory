// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenERC20 is ERC20Pausable, ERC20Burnable, Ownable, Initializable, ReentrancyGuard {
    string private _tokenName;
    string private _tokenSymbol;
    bool private initialized;

    constructor() ERC20("Placeholder", "PLH") Ownable(msg.sender) {}

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _owner
    ) external initializer nonReentrant {
        require(!initialized, "Already initialized");
        require(_owner != address(0), "Invalid owner address");
        require(bytes(_name).length > 0, "Token name is required");
        require(bytes(_symbol).length > 0, "Token symbol is required");
        require(_totalSupply > 0, "Total supply must be greater than zero");

        initialized = true;
        _tokenName = _name;
        _tokenSymbol = _symbol;
        _transferOwnership(_owner);
        _mint(_owner, _totalSupply * 10**decimals());
    }

    function name() public view override returns (string memory) {
        return _tokenName;
    }

    function symbol() public view override returns (string memory) {
        return _tokenSymbol;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /// @dev Override _update untuk menangani pause
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}
