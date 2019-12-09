"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.issueDocument = exports.getAttachment = exports.encryptDocumentData = exports.decryptDocumentData = exports.getDocument = void 0;

var _encryption = require("./encryption");

var _files = require("./files");

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
    encrypted,
    magic,
    body,
    data,
    ipfsDirectoryHash,
    pinned,
    created
  } = rawObject;
  return {
    id: id.replace(/^(0x)/, ''),
    organizationId: organizationId.replace(/^(0x)/, ''),
    encrypted,
    magic: magic.replace(/^(0x)/, ''),
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
    throw new Error('Organization not found.');
  }
};

const getDocumentById = async (contract, documentId) => {
  try {
    const response = await contract.methods.getDocumentById(`0x${documentId}`).call();
    return parseDocumentRawObject(response);
  } catch (err) {
    console.error(err);
    throw new Error('Document not found.');
  }
};

const getDocument = async (contract, ipfsClient, id, options = {}) => {
  const finalOptions = {
    organizationDetails: false,
    attachmentInformation: false,
    attachedFiles: false,
    ...options
  };
  const documentData = await getDocumentById(contract, id);

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

const decryptDocumentData = (documentData, password) => {
  const magic = (0, _encryption.hexToArrayBuffer)(documentData.magic);
  const [body, data, ipfsDirectoryHash] = decrypt([documentData.body, documentData.data, documentData.ipfsDirectoryHash], magic, password);

  try {
    return { ...documentData,
      body,
      data: JSON.parse(data),
      ipfsDirectoryHash
    };
  } catch (err) {
    throw new Error('Wrong password.');
  }
};

exports.decryptDocumentData = decryptDocumentData;

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

const issueDocument = async (contract, ipfsClient, body, data, attachments, options) => {
  const finalOptions = {
    encrypted: false,
    password: '',
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

exports.issueDocument = issueDocument;
//# sourceMappingURL=documents.js.map