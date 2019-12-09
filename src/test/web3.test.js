import { expect } from 'chai';

import createWeb3Instance from '../web3';

describe('Describe web3 module', () => {
  it('web3 instantiates successfully', async () => {
    const web3 = createWeb3Instance();
    const successfullyConnected = await web3.eth.net.isListening();
    expect(successfullyConnected).to.be.true;
  });
});
