import { expect } from 'chai';

import createIpfsClient from '../ipfs';

describe('Describe ipfs module', () => {
  const context = {};
  before(() => {
    context.ipfsClient = createIpfsClient();
  });
  it("should correctly establish a connection with Docsit's IPFS gateway", async () => {
    const response = await context.ipfsClient.get('/ipfs/QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy');
    expect(Array.isArray(response)).to.be.true;
    expect(response.length).to.equal(1);
    expect(response[0].path).to.equal('QmZtmD2qt6fJot32nabSP3CUjicnypEBz7bHVDhPQt9aAy');
    expect(response[0].content.toString('utf8')).to.equal('version 1 of my text\n');
  });
});
