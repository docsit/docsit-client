"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.listFilesInDirectory=exports.getFile=exports.saveFilesInDirectory=void 0;/**
 * Saves array of files to IPFS wrapped in a directory
 * @param {Array<{path: string, content: Buffer}>} files
 * @returns {Array<{path: string, hash: string, size: number}>} The CID of the directory that wraps the files uploaded
 */const saveFilesInDirectory=async(a,b)=>{// Infura client is the only one available that allows the upload of files
// TODO add support for mime types
const c=await a.add(b,{wrapWithDirectory:!0}),d=c.findIndex(({path:a})=>""===a),[e]=c.splice(d,1);return{directory:e,files:c}};/**
 * Get the content of files content from CID
 * @param {string} cid
 * @returns {Array<{path: string, content: Buffer}>} An array with the path and contents of files
 */exports.saveFilesInDirectory=saveFilesInDirectory;const getFile=(a,b)=>a.get(b);// Infura and ipfs.io clients allow file download
/**
 * Lists file information from directory CID
 * @param {string} cid
 * @returns {Array<{name: string, path: string, size: number, hash: string, type: string, depth: number}>} An array of information about each file in a directory
 */exports.getFile=getFile;const listFilesInDirectory=(a,b)=>a.ls(b);// ipfs.io client is the only one available that allows the listing of directories
exports.listFilesInDirectory=listFilesInDirectory;
//# sourceMappingURL=files.js.map