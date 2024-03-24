# crypto-aes

[![npm package](https://nodei.co/npm/crypto-aes.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/crypto-aes)

> AES encryption/decryption.

[![NPM version](https://img.shields.io/npm/v/crypto-aes.svg?style=flat)](https://npmjs.org/package/crypto-aes)
[![NPM Downloads](https://img.shields.io/npm/dm/crypto-aes.svg?style=flat)](https://npmjs.org/package/crypto-aes)


## Install

```bash
npm install --save crypto-aes
```

## Usage

```js
import {
  CBC,
  fromUTF8Bytes,
  toHexBytes,
  fromHexBytes,
  toUTF8Bytes,
  padPKCS7Padding,
  stripPKCS7Padding
} from 'crypto-aes';

// 跟 go 语言加密和解密保持一致

const key128 = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const iv = new Uint8Array([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
const plaintext = 'TextMustBe16Byte';
const ciphertext = '0605fda3e80da8724d66811725a98f961bf3ca2e1fadf6af8f7223425c74bc69';

// 测试 CBC 填充模式加密
const aesCbc = new CBC(key128, iv);
const encryptedBytes = aesCbc.encrypt(padPKCS7Padding(new Uint8Array(toUTF8Bytes(plaintext))));

// fromHexBytes(encryptedBytes) === ciphertext;

// 测试 CBC 填充模式解密
const aesCbc = new CBC(key128, iv);
const decryptedBytes = aesCbc.decrypt(toHexBytes(ciphertext));

// fromUTF8Bytes(stripPKCS7Padding(decryptedBytes)) === plaintext;
```