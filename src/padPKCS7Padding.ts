export default function padPKCS7Padding(ciphertext: Uint8Array): Uint8Array {
  const length = ciphertext.length;
  const padder = 16 - (length % 16);
  const result = new Uint8Array(length + padder);
  result.set(ciphertext);

  for (let i = length, len = result.length; i < len; i++) {
    result[i] = padder;
  }
  return result;
}
