import createWeb3Instance from './web3';
import createContractInstance from './contract';

const test = async () => {
  const web3 = createWeb3Instance();
  const account = web3.eth.accounts.privateKeyToAccount(
    '0xF765D39737D97F9D03B56EF93F9EF526302B942853B2B13AC41DA538FA3E978B'
  );
  web3.defaultAccount = account.address;
  const contract = createContractInstance(web3);
  const response = await contract.methods
    .createOrganization('General Contract Test Organization')
    .send({
      from: account.address,
    });
  console.log(response);
};
test();
