/* eslint-disable @typescript-eslint/no-magic-numbers */
// https://stackoverflow.com/a/39488643
export function getStringSizeInBytes(value: string): number {
  let bytes = 0;

  for (let index = 0; index < value.length; index++) {
    const codePoint = value.charCodeAt(index);

    if (codePoint >= 0xd800 && codePoint < 0xe000) {
      if (codePoint < 0xdc00 && index + 1 < value.length) {
        const next = value.charCodeAt(index + 1);

        if (next >= 0xdc00 && next < 0xe000) {
          bytes += 4;
          index++;
          continue;
        }
      }
    }

    if (codePoint < 0x80) {
      bytes += 1;
    } else {
      if (codePoint < 0x800) {
        bytes += 2;
      } else {
        bytes += 3;
      }
    }
  }

  return bytes;
}
