import ipfsClient from 'ipfs-http-client';

/**
 * Creates all available instances of ipfs
 * @returns {{infura: IpfsClient, ipfsIo: IpfsClient}} An object with all the create client instances
 */

const createIpfsClient = () =>
  // ipfsClient({
  //   host: '165.22.36.48',
  //   protocol: 'http',
  //   port: 5001,
  //   apiPath: '/api/v0',
  // });
  ipfsClient('/ip4/127.0.0.1/tcp/5001');

export default createIpfsClient;
