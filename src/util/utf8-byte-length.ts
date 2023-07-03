import {HIGH_SURROGATE_MIN} from '../const/utf-8/high-surrogate-min.js';
import {LOW_SURROGATE_MAX} from '../const/utf-8/low-surrogate-max.js';

export const UTF_8_BYTE_2_MIN = 0x80;
export const UTF_8_BYTE_3_MIN = 0x800;

/**
 * Calculate the UTF-8 byte length of a string.
 *
 * Note: this function assumes the input string code points representing valid
 * Unicode symbols.
 * If the string contains malformed or unpaired UTF-16 surrogate characters,
 * the result may not be accurate.
 */
export function utf8ByteLength(value: string): number {
  const BYTE_1 = 1;
  const BYTE_2 = 2;
  const BYTE_3 = 3;
  const BYTE_4 = 4;

  let bytes = 0;

  for (let index = 0; index < value.length; index++) {
    const charCode = value.charCodeAt(index);

    if (charCode < UTF_8_BYTE_2_MIN) {
      bytes += BYTE_1;
    } else if (charCode < UTF_8_BYTE_3_MIN) {
      bytes += BYTE_2;
    } else if (charCode < HIGH_SURROGATE_MIN || charCode > LOW_SURROGATE_MAX) {
      bytes += BYTE_3;
    } else {
      // surrogate pair
      index++; // Skip the next, as they form a pair
      bytes += BYTE_4;
    }
  }
  return bytes;
}
