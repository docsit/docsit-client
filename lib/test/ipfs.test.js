"use strict";

var _chai = require("chai");

var _ipfs = _interopRequireDefault(require("../ipfs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Describe ipfs module', () => {
  const context = {};
  before(() => {
    context.ipfsClient = (0, _ipfs.default)();
  });
  it("should correctly establish a connection with Docsit's IPFS gateway", async () => {
    const response = await context.ipfsClient.get('/ipfs/QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy');
    (0, _chai.expect)(Array.isArray(response)).to.be.true;
    (0, _chai.expect)(response.length).to.equal(1);
    (0, _chai.expect)(response[0].path).to.equal('QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy');
    (0, _chai.expect)(response[0].content.toString('utf8')).to.equal('version 1 of my text\n');
  });
});
//# sourceMappingURL=ipfs.test.js.map