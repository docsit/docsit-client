"use strict";var _ipfsHttpClient=_interopRequireDefault(require("ipfs-http-client"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * Creates all available instances of ipfs
 * @returns {{infura: IpfsClient, ipfsIo: IpfsClient}} An object with all the create client instances
 */const createIpfsClient=()=>(0,_ipfsHttpClient.default)({host:"165.22.36.48",protocol:"http",port:5001,apiPath:"/api/v0"});// ipfsClient('/ip4/127.0.0.1/tcp/5001');
var _default=createIpfsClient;exports.default=_default;
//# sourceMappingURL=ipfs.js.map