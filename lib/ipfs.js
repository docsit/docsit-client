"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ipfsHttpClient = _interopRequireDefault(require("ipfs-http-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates all available instances of ipfs
 * @returns {{infura: IpfsClient, ipfsIo: IpfsClient}} An object with all the create client instances
 */
const createIpfsClient = () => (0, _ipfsHttpClient.default)({
  host: '165.22.36.48',
  protocol: 'http',
  port: 5001,
  apiPath: '/api/v0'
}); // ipfsClient('/ip4/127.0.0.1/tcp/5001');


var _default = createIpfsClient;
exports.default = _default;
//# sourceMappingURL=ipfs.js.map