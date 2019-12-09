/**
 * Saves array of files to IPFS wrapped in a directory
 * @param {Array<{path: string, content: Buffer}>} files
 * @returns {Array<{path: string, hash: string, size: number}>} The CID of the directory that wraps the files uploaded
 */
export const saveFilesInDirectory = async (ipfsClient, files) => {
  // Infura client is the only one available that allows the upload of files
  // TODO add support for mime types
  const arrayOfFiles = await ipfsClient.add(files, { wrapWithDirectory: true });
  const directoryIndex = arrayOfFiles.findIndex(({ path }) => path === '');
  const [directory] = arrayOfFiles.splice(directoryIndex, 1);
  return { directory, files: arrayOfFiles };
};

/**
 * Get the content of files content from CID
 * @param {string} cid
 * @returns {Array<{path: string, content: Buffer}>} An array with the path and contents of files
 */
export const getFile = (ipfsClient, cid) => ipfsClient.get(cid); // Infura and ipfs.io clients allow file download

/**
 * Lists file information from directory CID
 * @param {string} cid
 * @returns {Array<{name: string, path: string, size: number, hash: string, type: string, depth: number}>} An array of information about each file in a directory
 */
export const listFilesInDirectory = (ipfsClient, cid) => ipfsClient.ls(cid); // ipfs.io client is the only one available that allows the listing of directories