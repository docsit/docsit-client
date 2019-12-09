"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IPFS_API_PATH = exports.IPFS_PROTOCOL = exports.IPFS_PORT = exports.IPFS_HOST = exports.CONTRACT_ADDRESS = exports.CONTRACT_ABI = exports.RPC_URL = exports.INFURA_API_KEY = exports.INFURA_ENDPOINT = void 0;
const INFURA_ENDPOINT = 'ropsten';
exports.INFURA_ENDPOINT = INFURA_ENDPOINT;
const INFURA_API_KEY = 'a1acb26e9c5048b7b26f1876723e9e4a';
exports.INFURA_API_KEY = INFURA_API_KEY;
const RPC_URL = `https://${INFURA_ENDPOINT}.infura.io/v3/${INFURA_API_KEY}`;
exports.RPC_URL = RPC_URL;
const CONTRACT_ABI = [{
  inputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor'
}, {
  anonymous: false,
  inputs: [{
    components: [{
      internalType: 'bytes8',
      name: 'id',
      type: 'bytes8'
    }, {
      internalType: 'bytes8',
      name: 'organizationId',
      type: 'bytes8'
    }, {
      internalType: 'bool',
      name: 'encrypted',
      type: 'bool'
    }, {
      internalType: 'bytes16',
      name: 'magic',
      type: 'bytes16'
    }, {
      internalType: 'string',
      name: 'body',
      type: 'string'
    }, {
      internalType: 'string',
      name: 'data',
      type: 'string'
    }, {
      internalType: 'string',
      name: 'ipfsDirectoryHash',
      type: 'string'
    }, {
      internalType: 'bool',
      name: 'pinned',
      type: 'bool'
    }, {
      internalType: 'uint256',
      name: 'created',
      type: 'uint256'
    }],
    indexed: false,
    internalType: 'struct Docsit.Document',
    name: '_document',
    type: 'tuple'
  }],
  name: 'DocumentIssued',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    components: [{
      internalType: 'bytes8',
      name: 'id',
      type: 'bytes8'
    }, {
      internalType: 'string',
      name: 'name',
      type: 'string'
    }, {
      internalType: 'bytes8[]',
      name: 'documentIds',
      type: 'bytes8[]'
    }, {
      internalType: 'uint256',
      name: 'created',
      type: 'uint256'
    }],
    indexed: false,
    internalType: 'struct Docsit.Organization',
    name: '_organization',
    type: 'tuple'
  }],
  name: 'OrganizationCreated',
  type: 'event'
}, {
  constant: true,
  inputs: [],
  name: 'contractIdentifier',
  outputs: [{
    internalType: 'string',
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'owner',
  outputs: [{
    internalType: 'address payable',
    name: '',
    type: 'address'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [],
  name: 'deleteContract',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'string',
    name: '_name',
    type: 'string'
  }],
  name: 'createOrganization',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes8',
    name: '_organizationId',
    type: 'bytes8'
  }],
  name: 'getOrganizationById',
  outputs: [{
    components: [{
      internalType: 'bytes8',
      name: 'id',
      type: 'bytes8'
    }, {
      internalType: 'string',
      name: 'name',
      type: 'string'
    }, {
      internalType: 'bytes8[]',
      name: 'documentIds',
      type: 'bytes8[]'
    }, {
      internalType: 'uint256',
      name: 'created',
      type: 'uint256'
    }],
    internalType: 'struct Docsit.Organization',
    name: '_organization',
    type: 'tuple'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'getAllOrganizations',
  outputs: [{
    internalType: 'bytes8[]',
    name: '',
    type: 'bytes8[]'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes8',
    name: '_organizationId',
    type: 'bytes8'
  }],
  name: 'getAllDocumentIdsFromOrganization',
  outputs: [{
    internalType: 'bytes8[]',
    name: '',
    type: 'bytes8[]'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    internalType: 'bytes8',
    name: '_organizationId',
    type: 'bytes8'
  }, {
    internalType: 'bool',
    name: '_encrypted',
    type: 'bool'
  }, {
    internalType: 'bytes16',
    name: '_magic',
    type: 'bytes16'
  }, {
    internalType: 'string',
    name: '_body',
    type: 'string'
  }, {
    internalType: 'string',
    name: '_data',
    type: 'string'
  }, {
    internalType: 'string',
    name: '_ipfsDirectoryHash',
    type: 'string'
  }],
  name: 'issueDocument',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'bytes8',
    name: '_documentId',
    type: 'bytes8'
  }],
  name: 'getDocumentById',
  outputs: [{
    components: [{
      internalType: 'bytes8',
      name: 'id',
      type: 'bytes8'
    }, {
      internalType: 'bytes8',
      name: 'organizationId',
      type: 'bytes8'
    }, {
      internalType: 'bool',
      name: 'encrypted',
      type: 'bool'
    }, {
      internalType: 'bytes16',
      name: 'magic',
      type: 'bytes16'
    }, {
      internalType: 'string',
      name: 'body',
      type: 'string'
    }, {
      internalType: 'string',
      name: 'data',
      type: 'string'
    }, {
      internalType: 'string',
      name: 'ipfsDirectoryHash',
      type: 'string'
    }, {
      internalType: 'bool',
      name: 'pinned',
      type: 'bool'
    }, {
      internalType: 'uint256',
      name: 'created',
      type: 'uint256'
    }],
    internalType: 'struct Docsit.Document',
    name: '',
    type: 'tuple'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];
exports.CONTRACT_ABI = CONTRACT_ABI;
const CONTRACT_ADDRESS = '0xc12E0A6c51515d735D83158Cb9974BD00F0a9209'; // export const IPFS_HOST = '165.22.36.48';
// export const IPFS_PORT = 5001;
// export const IPFS_PROTOCOL = 'http';
// export const IPFS_API_PATH = '/api/v0';

exports.CONTRACT_ADDRESS = CONTRACT_ADDRESS;
const IPFS_HOST = '127.0.0.1';
exports.IPFS_HOST = IPFS_HOST;
const IPFS_PORT = '5001';
exports.IPFS_PORT = IPFS_PORT;
const IPFS_PROTOCOL = 'http';
exports.IPFS_PROTOCOL = IPFS_PROTOCOL;
const IPFS_API_PATH = '/api/v0';
exports.IPFS_API_PATH = IPFS_API_PATH;
//# sourceMappingURL=config.js.map