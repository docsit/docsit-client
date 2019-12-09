"use strict";

var _chai = require("chai");

require("./web3.test");

var _web2 = _interopRequireDefault(require("../web3"));

var _contract = _interopRequireDefault(require("../contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe contract module', () => {
  const context = {};
  before(() => {
    context.web3 = (0, _web2.default)();
  });
  it('contract instantiates successfully', async () => {
    const contract = (0, _contract.default)(context.web3);
    const contractIdentifier = await contract.methods.contractIdentifier().call();
    (0, _chai.expect)(contractIdentifier).to.equal('docsit_1');
  });
});
//# sourceMappingURL=contract.test.js.map