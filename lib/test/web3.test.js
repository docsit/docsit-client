"use strict";

var _chai = require("chai");

var _web = _interopRequireDefault(require("../web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe web3 module', () => {
  it('web3 instantiates successfully', async () => {
    const web3 = (0, _web.default)();
    const successfullyConnected = await web3.eth.net.isListening();
    (0, _chai.expect)(successfullyConnected).to.be.true;
  });
});
//# sourceMappingURL=web3.test.js.map