import AES from './AES';
import { arrayCopy } from './shared/arrayCopy';
import { coerceUint8 } from './shared/coerceUint8';

export default class CBC {
  private lastCipherblock_!: Uint8Array;
  private readonly aes_!: AES;

  constructor(key: number[] | Uint8Array, iv: number[] | Uint8Array) {
    if (!iv) {
      iv = new Uint8Array(16);

    }
    else if (iv.length !== 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)');
    }

    this.lastCipherblock_ = coerceUint8(iv, true);
    this.aes_ = new AES(key);
  }

  encrypt(plaintext: Uint8Array | number[]): Uint8Array {
    const len = plaintext.length;

    if ((len % 16) !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    const ciphertext = new Uint8Array(len);
    const block = new Uint8Array(16);
    let iv = this.lastCipherblock_;

    for (let i = 0; i < len; i += 16) {
      arrayCopy(plaintext, i, block, 0, 16);

      for (let j = 0; j < 16; j++) {
        block[j] ^= iv[j];
      }

      iv = this.aes_.encrypt(block);
      ciphertext.set(iv, i);
    }

    this.lastCipherblock_ = iv;

    return ciphertext;
  }

  decrypt(ciphertext: Uint8Array | number[]): Uint8Array {
    const len = ciphertext.length;

    if ((len % 16) !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    const plaintext = new Uint8Array(len);
    let block = new Uint8Array(16);
    const iv = this.lastCipherblock_;

    for (let i = 0; i < len; i += 16) {
      arrayCopy(ciphertext, i, block, 0, 16);
      block = this.aes_.decrypt(block);

      for (let j = 0; j < 16; j++) {
        plaintext[i + j] = block[j] ^ iv[j];
      }

      arrayCopy(ciphertext, i, iv, 0, 16);
    }

    return plaintext;
  }
}
