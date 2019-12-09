import { expect } from 'chai';

import './web3.test';
import createWeb3Instance from '../web3';
import createContractInstace from '../contract';

describe('Describe contract module', () => {
  const context = {};
  before(() => {
    context.web3 = createWeb3Instance();
  });
  it('contract instantiates successfully', async () => {
    const contract = createContractInstace(context.web3);
    const contractIdentifier = await contract.methods.contractIdentifier().call();
    expect(contractIdentifier).to.equal('docsit_1');
  });
});
