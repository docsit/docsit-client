import Web3 from 'web3';
import { RPC_URL } from './config';

const createWeb3Instance = () => new Web3(RPC_URL);

export default createWeb3Instance;
