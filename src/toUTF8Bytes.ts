export default function toUTF8Bytes(text: string): number[] {
  const result: number[] = [];
  let i = 0;
  text = encodeURI(text);
  while (i < text.length) {
    const c = text.charCodeAt(i++);

    // if it is a % sign, encode the following 2 bytes as a hex value
    if (c === 37) {
      result.push(parseInt(text.substr(i, 2), 16));
      i += 2;

      // otherwise, just the actual byte
    }
    else {
      result.push(c);
    }
  }

  return result;
}
