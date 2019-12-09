import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';

/**
 * Creates the contract instance using the Web3 instance provided
 * @param {Web3} web3 The Web3 instance used to create the contract
 * @returns {Web3.Contract} The created instance of the contract
 */
const createContractInstance = web3 => new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export default createContractInstance;