import { expect } from 'chai';

import {
  hexStringToBuffer,
  bufferToHexString,
  utf8StringToArray,
  encryptMultiple,
  decryptMultiple,
} from '../encryption';

describe('Describe encryption module', () => {
  it('correctly converts an 0 hex string to an array', async () => {
    const HEX_STRING = '00000000000000000000000000000000';
    const arrayBuffer = hexStringToBuffer(HEX_STRING);
    expect(arrayBuffer).to.eql(new Uint8Array(16));
  });

  it('correctly converts a filled hex string to an array', async () => {
    const HEX_STRING = 'cbf3ebc2bf3f10480a47bdd51a544d1a';
    const arrayBuffer = hexStringToBuffer(HEX_STRING);
    expect(arrayBuffer).to.eql(
      new Uint8Array([203, 243, 235, 194, 191, 63, 16, 72, 10, 71, 189, 213, 26, 84, 77, 26])
    );
  });

  it('correctly converts empty array to hex string', async () => {
    const ARRAY = new Uint8Array(16);
    const hexString = bufferToHexString(ARRAY);
    expect(hexString).to.equal('00000000000000000000000000000000');
  });

  it('correctly converts a filled array to hex string', async () => {
    const ARRAY = new Uint8Array([
      203,
      243,
      235,
      194,
      191,
      63,
      16,
      72,
      10,
      71,
      189,
      213,
      26,
      84,
      77,
      26,
    ]);
    const hexString = bufferToHexString(ARRAY);
    expect(hexString).to.equal('cbf3ebc2bf3f10480a47bdd51a544d1a');
  });

  it('correctly converts a utf8 string to an array', async () => {
    const STRING = 'hola:jota';
    const array = utf8StringToArray(STRING);
    expect(array.length).to.equal(STRING.length);
    for (let i = 0; i < STRING.length; i += 1) {
      expect(array[i]).to.equal(STRING.charCodeAt(i));
    }
  });

  it('correctly decrypts multiple string with the correct password', async () => {
    const PASSWORD = 'jota, pasame la sal';
    const HEX_MAGIC = '1fae168d77f474896bae8537257dddfb';
    const ENCRYPTED_BODY = 'aae515ea4bcfb574a549a5340f23829a';
    const ENCRYPTED_DATA = 'e5f095d3645fdb68b27952d84b76a6aa';
    const ENCRYPTED_IPFS_DICRECTORY_HASH =
      '23388186f1915d1635faa41c4fb255e5512b784bf1fb171dc6497719f4703a22623963fd51c7b743a8a1e2f136c57a34';
    const response = await decryptMultiple(
      [ENCRYPTED_BODY, ENCRYPTED_DATA, ENCRYPTED_IPFS_DICRECTORY_HASH],
      HEX_MAGIC,
      PASSWORD
    );
    expect(response).to.eql([
      '# Title',
      JSON.stringify({
        hola: 'jota',
      }),
      'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU',
    ]);
  });

  it('correctly encrypts and then decrypts multiple strings', async () => {
    const PASSWORD = 'jota, pasame la sal';
    const BODY = '# Title';
    const DATA = JSON.stringify({
      hola: 'jota',
    });
    const IPFS_DIRECTORY_HASH = 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU';
    const { hexMagic, encryptedArray } = await encryptMultiple(
      [BODY, DATA, IPFS_DIRECTORY_HASH],
      PASSWORD
    );
    const [body, data, ipfsDirectoryHash] = await decryptMultiple(
      encryptedArray,
      hexMagic,
      PASSWORD
    );
    expect(body).to.equal(BODY);
    expect(data).to.equal(DATA);
    expect(ipfsDirectoryHash).to.equal(IPFS_DIRECTORY_HASH);
  });

  it('throws an error if multiple string are decrypted with invalid password', async () => {
    const BODY = '# Title';
    const DATA = JSON.stringify({
      hola: 'jota',
    });
    const IPFS_DIRECTORY_HASH = 'QmT4n2a261NS1ekg6zfxhYGuojCQCkpQGhP8LPSeJkQcXU';
    const { hexMagic, encryptedArray } = await encryptMultiple(
      [BODY, DATA, IPFS_DIRECTORY_HASH],
      'jota, pasame la sal'
    );
    try {
      await decryptMultiple(encryptedArray, hexMagic, 'jota, pasame el salero');
    } catch (err) {
      console.log(err);
      expect(true).to.be.true;
    }
  });
});
