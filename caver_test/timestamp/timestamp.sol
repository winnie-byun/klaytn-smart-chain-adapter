pragma solidity ^0.5.6;

contract Times {
    address owner = msg.sender;
    uint256[] public times;
    uint256 public lastTime;

    constructor() public payable {}

    // destroy the contract and reclaim the leftover funds.
    function kill() public {
        require(msg.sender == owner);
        selfdestruct(msg.sender);
    }

    function setTime(uint256 t) public {
        require(msg.sender == owner);
        times.push(t);
        lastTime = t;
    }

    function getTime() public view returns (uint256[] memory) {
        return times;
    }

    function getLastTime() public view returns (uint256) {
        return lastTime;
    }
}
