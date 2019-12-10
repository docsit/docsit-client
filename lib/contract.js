"use strict";var _config=require("./config");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;/**
 * Creates the contract instance using the Web3 instance provided
 * @param {Web3} web3 The Web3 instance used to create the contract
 * @returns {Web3.Contract} The created instance of the contract
 */const createContractInstance=a=>new a.eth.Contract(_config.CONTRACT_ABI,_config.CONTRACT_ADDRESS);var _default=createContractInstance;exports.default=_default;
//# sourceMappingURL=contract.js.map