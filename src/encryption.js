const webCrypto = require('@trust/webcrypto');

const window = {
  crypto: webCrypto,
};

export const utf8StringToArray = str => {
  if (typeof str !== 'string') throw new TypeError('Expected input to be a string');
  const textEncoder = new TextEncoder('utf-8');
  return textEncoder.encode(str);
};

export const hexStringToBuffer = hex => {
  if (typeof hex !== 'string') throw new TypeError('Expected input to be a string');
  if (hex.length % 2 !== 0)
    throw new RangeError('Expected string to be an even number of characters');

  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    array[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return array;
};

export const bufferToHexString = array => {
  if (!Array.isArray(array) && !ArrayBuffer.isView(array))
    throw new TypeError('Expected input to be array');
  return array.reduce((accumulated, next) => accumulated + next.toString(16).padStart(2, '0'), '');
};

export const generateKey = async (magic, password) => {
  const hexMagic = bufferToHexString(magic);
  const saltedPassword = `${hexMagic};${password}`;
  const keyBuffer = await window.crypto.subtle.digest(
    { name: 'SHA-256' },
    utf8StringToArray(saltedPassword)
  ); // TODO: Remove the object for correct web implementation
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'AES-CBC' },
    true,
    ['encrypt', 'decrypt']
  );
  return cryptoKey;
};

export const encryptMultiple = async (unencryptedArray, password) => {
  const magic = window.crypto.getRandomValues(new Uint8Array(16));
  const cryptoKey = await generateKey(magic, password);
  const encryptedArray = await Promise.all(
    unencryptedArray.map(async unencryptedText => {
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: magic },
        cryptoKey,
        utf8StringToArray(unencryptedText)
      );
      return bufferToHexString(new Uint8Array(encryptedBuffer));
    })
  );
  return {
    hexMagic: bufferToHexString(magic),
    encryptedArray,
  };
};

export const decryptMultiple = async (encryptedArray, hexMagic, password) => {
  const magic = hexStringToBuffer(hexMagic);
  const cryptoKey = await generateKey(magic, password);
  const decryptedArray = await Promise.all(
    encryptedArray.map(async encryptedText => {
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: magic },
        cryptoKey,
        utf8StringToArray(encryptedText)
      );
      return bufferToHexString(new Uint8Array(decryptedBuffer));
    })
  );
  return decryptedArray;
};
