export default function stripPKCS7Padding(plaintext: Uint8Array, copy?: boolean): Uint8Array {
  let length = plaintext.length;
  if (length < 16) {
    throw new Error('PKCS#7 invalid length');
  }

  // 补码长度
  const padder = plaintext[length - 1];
  // 补码最多16个字节
  if (padder > 16) {
    throw new Error('PKCS#7 padding byte out of range');
  }

  length -= padder;
  for (let i = 0; i < padder; i++) {
    if (plaintext[length + i] !== padder) {
      throw new Error('PKCS#7 invalid padding byte');
    }
  }

  if (copy) {
    const result = new Uint8Array(length);
    result.set(plaintext);
    return result;
  }

  return plaintext.subarray(0, length);
}
