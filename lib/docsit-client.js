"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _web = _interopRequireDefault(require("./web3"));

var _contract = _interopRequireDefault(require("./contract"));

var _ipfs = _interopRequireDefault(require("./ipfs"));

var _documents = require("./documents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module @docsit/client */
class DocsitClient {
  constructor() {
    /** @private */
    this.web3 = (0, _web.default)();
    /** @private */

    this.contract = (0, _contract.default)(this.web3);
    /** @private */

    this.ipfsClient = (0, _ipfs.default)();
    /* Setup Ethereum account */

    const accountPrivateKey = localStorage && localStorage.getItem('docsitEthereumPrivateKey');

    if (accountPrivateKey) {
      this.web3.eth.accounts.privateKeyToAccount(accountPrivateKey);
      return;
    }

    const {
      privateKey
    } = this.web3.eth.accounts.create();
    if (localStorage) localStorage.setItem(privateKey);
  }

  getDocument(id, options) {
    return (0, _documents.getDocument)(this.contract, this.ipfsClient, id, options);
  } // getAttachment(cid) {
  //   return getAttachment(this.ipfsClient, cid);
  // }
  // issueDocument(body, data, attachments) {
  //   return issueDocument(this.contract, this.ipfsClient, body, data, attachments);
  // }


}

var _default = Docsit;
exports.default = _default;
//# sourceMappingURL=docsit-client.js.map