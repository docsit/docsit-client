/** @module @docsit/client */
import createWeb3Instance from './web3';
import createContractInstance from './contract';
import createIpfsClient from './ipfs';
import { getDocument /* , getAttachment, issueDocument */ } from './documents';

class DocsitClient {
  constructor() {
    /** @private */
    this.web3 = createWeb3Instance();
    /** @private */
    this.contract = createContractInstance(this.web3);
    /** @private */
    this.ipfsClient = createIpfsClient();

    /* Setup Ethereum account */
    const accountPrivateKey = localStorage && localStorage.getItem('docsitEthereumPrivateKey');
    if (accountPrivateKey) {
      this.web3.eth.accounts.privateKeyToAccount(accountPrivateKey);
      return;
    }
    const { privateKey } = this.web3.eth.accounts.create();
    if (localStorage) localStorage.setItem('docsitEthereumPrivateKey', privateKey);
  }

  getDocument(id, options) {
    return getDocument(this.contract, this.ipfsClient, id, options);
  }

  // getAttachment(cid) {
  //   return getAttachment(this.ipfsClient, cid);
  // }

  // issueDocument(body, data, attachments) {
  //   return issueDocument(this.contract, this.ipfsClient, body, data, attachments);
  // }
}

export default DocsitClient;
