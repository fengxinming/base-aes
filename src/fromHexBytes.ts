const Hex = '0123456789abcdef';
export default function fromHexBytes(bytes: ArrayLike<number>) {
  const result: string[] = [];
  for (let i = 0, len = bytes.length; i < len; i++) {
    const v = bytes[i];
    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
  }
  return result.join('');
}
