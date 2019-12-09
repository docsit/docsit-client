"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _web = _interopRequireDefault(require("web3"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createWeb3Instance = () => new _web.default(_config.RPC_URL);

var _default = createWeb3Instance;
exports.default = _default;
//# sourceMappingURL=web3.js.map