"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _web=_interopRequireDefault(require("./web3")),_contract=_interopRequireDefault(require("./contract")),_ipfs=_interopRequireDefault(require("./ipfs")),_documents=require("./documents");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/** @module @docsit/client */class DocsitClient{constructor(){this.web3=(0,_web.default)(),this.contract=(0,_contract.default)(this.web3),this.ipfsClient=(0,_ipfs.default)();/* Setup Ethereum account */const a=localStorage&&localStorage.getItem("docsitEthereumPrivateKey");if(a)return void this.web3.eth.accounts.privateKeyToAccount(a);const{privateKey:b}=this.web3.eth.accounts.create();localStorage&&localStorage.setItem(b)}getDocument(a,b){return(0,_documents.getDocument)(this.contract,this.ipfsClient,a,b)}// getAttachment(cid) {
//   return getAttachment(this.ipfsClient, cid);
// }
// issueDocument(body, data, attachments) {
//   return issueDocument(this.contract, this.ipfsClient, body, data, attachments);
// }
}var _default=DocsitClient;exports.default=_default;
//# sourceMappingURL=docsit-client.js.map