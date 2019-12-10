import { expect } from 'chai';

import './web3.test';
import './contract.test';
import './ipfs.test';
import createWeb3Instace from '../web3';
import createContractInstance from '../contract';
import createIpfsClient from '../ipfs';
import { getDocument } from '../documents';

describe('Describe document module', () => {
  const context = {};
  before(() => {
    context.web3 = createWeb3Instace();
    context.contract = createContractInstance(context.web3);
    context.ipfsClient = createIpfsClient();
  });

  it('gets unencrypted document with no options', async () => {
    const documentData = await getDocument(
      context.contract,
      context.ipfsClient,
      'a8719f44df881b7c'
    );
    expect(documentData).to.eql({
      id: 'a8719f44df881b7c',
      organizationId: '1fd5f224b87d03f4',
      magic: '00000000000000000000000000000000',
      body: '# Title',
      data: { hola: 'jota' },
      ipfsDirectoryHash: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU',
      pinned: true,
      created: new Date(1575841952000),
    });
  });

  it('gets unencrypted document with organization details', async () => {
    const documentData = await getDocument(
      context.contract,
      context.ipfsClient,
      'a8719f44df881b7c',
      {
        organizationDetails: true,
      }
    );
    expect(documentData).to.eql({
      id: 'a8719f44df881b7c',
      organizationId: '1fd5f224b87d03f4',
      organization: {
        created: new Date('2019-12-08T20:53:24.000Z'),
        documentIds: [
          '1eff3b7333183499',
          '7f16f3668b9efa6f',
          'a4e95e3b90d4fcec',
          'fef18a53e7282b83',
          'c92a0af21d8c85c4',
          '221fb2db2b30e17b',
          'c6bd5503e8a17cf0',
          '221fb2db2b30e17b',
          'a3fc220059d90999',
          'a8719f44df881b7c',
          '34206c975e2e09e7',
          'c0d736e9dcca10ee',
          '707d221731bdf977',
          '1ecd7cabbce08050',
          '1f0bf9f73d4267cf',
          '180df03800d8bb0c',
          'c9160ead4dc366a9',
          '150e214c9b682ce6',
          'b4d667afdd227fe5',
          '102229f2198659b3',
          '36b35eca24d74d01',
          'ebde1248df2e4a0a',
          'c7a044e63732ae72',
          '33f04d11edd6a98f',
          'fdba6be4dfd22a79',
          'f63f4631526973e1',
          '15523e2175668aa3',
          'c2a040b6bcf5705e',
          '45653c51de33a2ef',
          '02c664fd182ab388',
          '0e6a3b7ad38c3dfe',
          'e2bb559443cd7a47',
          '77c7da1516b12f36',
          '4d3d570a373bf5b5',
          '31003f53970db2b4',
          'd662f6c63e629459',
        ],
        id: '1fd5f224b87d03f4',
        name: 'Docsit Client Test Organization',
      },
      magic: '00000000000000000000000000000000',
      body: '# Title',
      data: { hola: 'jota' },
      ipfsDirectoryHash: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU',
      pinned: true,
      created: new Date(1575841952000),
    });
  });

  it('gets unencrypted document with attachment information', async () => {
    const documentData = await getDocument(
      context.contract,
      context.ipfsClient,
      'a8719f44df881b7c',
      {
        attachmentInformation: true,
      }
    );
    expect(documentData).to.eql({
      id: 'a8719f44df881b7c',
      organizationId: '1fd5f224b87d03f4',
      magic: '00000000000000000000000000000000',
      body: '# Title',
      data: { hola: 'jota' },
      attachments: [
        {
          depth: 1,
          hash: 'QmVYL9ceTmuZWiDJipHVktvEjx35PpUeNpQViWyfkUT2My',
          name: 'default-skin.css',
          path: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU/default-skin.css',
          size: 11607,
          type: 'file',
        },
        {
          depth: 1,

          hash: 'QmekKeMRq7mwvBspZwEfTiTeVnxPRQ3WqQzcnA7MAZ3Fux',
          name: 'default-skin.min.css',
          path: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU/default-skin.min.css',
          size: 7897,
          type: 'file',
        },
        {
          depth: 1,
          hash: 'QmTpcLZFRhXSZ4c3M4bBWWUrmRKGXv3gfF3JwZVnhx7eZm',
          name: 'default-skin.png',
          path: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU/default-skin.png',
          size: 547,
          type: 'file',
        },
        {
          depth: 1,
          hash: 'Qmd6jmGpkirFedm5B4X7H77oguwKitAZtNtyJR2ygZcu1E',
          name: 'default-skin.svg',
          path: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU/default-skin.svg',
          size: 1554,
          type: 'file',
        },
        {
          depth: 1,
          hash: 'QmT2sYCQp7u56Xee3oDW7Wv7ZDD1aEF6NQVqWyViJpuV3u',
          name: 'preloader.gif',
          path: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU/preloader.gif',
          size: 866,
          type: 'file',
        },
      ],
      ipfsDirectoryHash: 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU',
      pinned: true,
      created: new Date(1575841952000),
    });
  });

  it.skip('gets unencrypted document with attachmented files', async () => {
    const documentData = await getDocument(
      context.contract,
      context.ipfsClient,
      'd47b0bc94ddde188',
      {
        attachedFiles: true,
      }
    );
    expect(documentData).to.eql({
      id: 'd47b0bc94ddde188',
      organizationId: '584b071315f47728',
      magic: '00000000000000000000000000000000',
      body: '# Title',
      data: {},
      ipfsDirectoryHash: 'QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D',
      pinned: true,
      created: new Date(1575838837000),
    });
  });

  it.skip('gets encrypted document with no options', async () => {});

  it.skip('gets encrypted document with organization details', async () => {});

  it.skip('gets encrypted document with attachment information', async () => {});

  it.skip('gets encrypted document with attachmented files', async () => {});
});
