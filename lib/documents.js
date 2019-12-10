"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateDocument = exports.getAttachment = exports.encryptDocumentData = exports.getDocument = void 0;

var _customError = _interopRequireDefault(require("./custom-error"));

var _encryption = require("./encryption");

var _files = require("./files");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stripHex = hex => hex.replace(/^(0x)/, '');

const parseOrganizationRawObject = rawObject => {
  const {
    id,
    name,
    documentIds,
    created
  } = rawObject;
  return {
    id: id.replace(/^(0x)/, ''),
    name,
    documentIds: documentIds.map(documentId => documentId.replace(/^(0x)/, '')),
    created: new Date(created * 1000)
  };
};

const parseDocumentRawObject = rawObject => {
  const {
    id,
    organizationId,
    magic,
    body,
    data,
    ipfsDirectoryHash,
    pinned,
    created
  } = rawObject;
  return {
    id: stripHex(id),
    organizationId: stripHex(organizationId),
    magic: stripHex(magic),
    body,
    data: JSON.parse(data),
    ipfsDirectoryHash,
    pinned,
    created: new Date(created * 1000)
  };
};

const getOrganizationById = async (contract, organizationId) => {
  try {
    const response = await contract.methods.getOrganizationById(`0x${organizationId}`).call();
    return parseOrganizationRawObject(response);
  } catch (err) {
    console.error(err);
    throw new _customError.default('Organization not found', 'NONEXISTENT_ORGANIZATION');
  }
};

const getDocumentById = async (contract, documentId) => {
  try {
    const response = await contract.methods.getDocumentById(`0x${documentId}`).call();
    return parseDocumentRawObject(response);
  } catch (err) {
    console.error(err);
    throw new _customError.default('Document not found', 'NONEXISTENT_DOCUMENT');
  }
};

const getDocument = async (contract, ipfsClient, id, options = {}) => {
  const finalOptions = {
    organizationDetails: false,
    attachmentInformation: false,
    attachedFiles: false,
    // requestPassword: () => {},
    wrongPasswordAlert: () => {},
    ...options
  };
  let rawDocumentData;

  try {
    rawDocumentData = await contract.methods.getDocumentById(`0x${id}`).call();
  } catch (err) {
    throw new _customError.default('Document does not exist', 'NONEXISTENT_DOCUMENT');
  }

  if (rawDocumentData.magic !== '0x00000000000000000000000000000000') {
    if (typeof finalOptions.requestPassword !== 'function') throw new _customError.default('Document is encrypted and requirePassword function was not provided');

    while (true) {
      const password = finalOptions.requestPassword();

      try {
        const [body, data, ipfsDirectoryHash] = (0, _encryption.decryptMultiple)([rawDocumentData.body, rawDocumentData.data, rawDocumentData.ipfsDirectoryHash], stripHex(rawDocumentData.magic), password);
        rawDocumentData.body = body;
        rawDocumentData.data = data;
        rawDocumentData.ipfsDirectoryHash = ipfsDirectoryHash;
      } catch (e) {
        finalOptions.wrongPasswordAlert();
      }
    }
  }

  const documentData = parseDocumentRawObject(rawDocumentData);

  if (finalOptions.organizationDetails) {
    documentData.organization = await getOrganizationById(contract, documentData.organizationId);
  }

  if (finalOptions.attachmentInformation || finalOptions.attachedFiles) {
    const attachmentsData = await (0, _files.listFilesInDirectory)(ipfsClient, documentData.ipfsDirectoryHash);
    documentData.attachments = attachmentsData;

    if (finalOptions.attachedFiles) {
      const promiseArray = attachmentsData.map(async attachment => {
        const {
          content
        } = await (0, _files.getFile)(ipfsClient, attachment.hash);
        return { ...attachment,
          content
        };
      });
      documentData.attachments = await Promise.all(promiseArray);
    }
  }

  return documentData;
};

exports.getDocument = getDocument;

const encryptDocumentData = (documentData, password) => {
  const {
    magic,
    encryptedArray: [body, data, ipfsDirectoryHash]
  } = encrypt([documentData.body, documentData.data, documentData.ipfsDirectoryHash], password);
  return { ...documentData,
    magic,
    body,
    data,
    ipfsDirectoryHash
  };
};

exports.encryptDocumentData = encryptDocumentData;

const getAttachment = (ipfsClient, cid) => (0, _files.getFile)(ipfsClient, cid).then(file => file.content);

exports.getAttachment = getAttachment;

const generateDocument = async (contract, ipfsClient, body, data, attachments, options) => {
  const finalOptions = {
    encrypted: false,
    // password: '',
    ...options
  };
  const {
    directory: {
      hash: ipfsDirectoryHash
    }
  } = (0, _files.saveFilesInDirectory)(ipfsClient, attachments);
  let documentData = {
    encrypted: finalOptions.encrypted,
    data,
    body,
    ipfsDirectoryHash
  };

  if (finalOptions.encrypted) {
    documentData = encryptDocumentData(documentData);
  } else {
    documentData.magic = Uint8Array(16);
  }

  throw new Error('This feature is not implemented yet');
};

exports.generateDocument = generateDocument;
//# sourceMappingURL=documents.js.map