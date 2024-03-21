export default function toHexBytes(text: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < text.length; i += 2) {
    result.push(parseInt(text.slice(i, i + 2), 16));
  }

  return result;
}
