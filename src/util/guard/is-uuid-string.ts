/* eslint-disable @typescript-eslint/no-magic-numbers */

import type {UuidString} from '../../type/uuid-string.js';

const UUID_LENGTH = 36;
const HEX_LOWER_BOUND = 48;
const HEX_UPPER_BOUND = 57;
const ALPHABET_LOWER = 97;
const ALPHABET_UPPER = 102;
const HYPHEN_CHAR_CODE = 45;

function isHexadecimal(str: string, start: number, length: number): boolean {
  for (let i = start; i < length; i++) {
    const code: number = str.charCodeAt(i);

    if (
      !(code >= HEX_LOWER_BOUND && code <= HEX_UPPER_BOUND) && // numeric (0-9)
      !(code >= ALPHABET_LOWER && code <= ALPHABET_UPPER) // alphabets (a-f)
    ) {
      return false;
    }
  }
  return true;
}

export function isUuidString<T extends UuidString>(value: string): value is T {
  return (
    value.length === UUID_LENGTH &&
    isHexadecimal(value, 0, 8) &&
    value.charCodeAt(8) === HYPHEN_CHAR_CODE &&
    isHexadecimal(value, 9, 13) &&
    value.charCodeAt(13) === HYPHEN_CHAR_CODE &&
    isHexadecimal(value, 14, 18) &&
    value.charCodeAt(18) === HYPHEN_CHAR_CODE &&
    isHexadecimal(value, 19, 23) &&
    value.charCodeAt(23) === HYPHEN_CHAR_CODE &&
    isHexadecimal(value, 24, UUID_LENGTH)
  );
}
