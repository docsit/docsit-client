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
      encrypted: false,
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
        ],
        id: '1fd5f224b87d03f4',
        name: 'Docsit Client Test Organization',
      },
      encrypted: false,
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
      encrypted: false,
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
      encrypted: true, // TODO: THIS SHOULD BE FALSE
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

  it.skip('gets encrypted document with attachmen information', async () => {});

  it.skip('gets encrypted document with attachmented files', async () => {});
});
