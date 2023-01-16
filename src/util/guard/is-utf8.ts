const SURROGATE_BITS = 0b11111100_00000000;

const LOW_SURROGATE_BITS_VALUE = 0b11011000_00000000;
const HIGH_SURROGATE_BITS_VALUE = 0b11011100_00000000;

function isLowSurrogate(code: number): boolean {
  return ((code & SURROGATE_BITS) ^ LOW_SURROGATE_BITS_VALUE) === 0;
}

function isHighSurrogate(code: number): boolean {
  return ((code & SURROGATE_BITS) ^ HIGH_SURROGATE_BITS_VALUE) === 0;
}

/**
 * Checks that the string does not contain broken surrogate pairs and can be
 * correctly encoded in UTF-8.
 */
export function isUtf8(value: string): boolean {
  const {length} = value;

  for (let index = 0; index < length; index++) {
    const code: number = value.charCodeAt(index);

    if (isLowSurrogate(code)) {
      if (
        index + 1 === length ||
        !isHighSurrogate(value.charCodeAt(index + 1))
      ) {
        return false;
      }

      index++;
    } else if (isHighSurrogate(code)) {
      return false;
    }
  }

  return true;
}
