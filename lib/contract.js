"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("./config");

/**
 * Creates the contract instance using the Web3 instance provided
 * @param {Web3} web3 The Web3 instance used to create the contract
 * @returns {Web3.Contract} The created instance of the contract
 */
const createContractInstance = web3 => new web3.eth.Contract(_config.CONTRACT_ABI, _config.CONTRACT_ADDRESS);

var _default = createContractInstance;
exports.default = _default;
//# sourceMappingURL=contract.js.map