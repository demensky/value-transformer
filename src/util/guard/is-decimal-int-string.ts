const ASCII_ZERO = 48;
const ASCII_NINE = 57;
const ASCII_MINUS = 45;

export function isDecimalIntString(value: string): boolean {
  if (value.length === 0) {
    return false;
  }

  const initialCharCode = value.charCodeAt(0);

  let start = 0;

  if (initialCharCode === ASCII_MINUS) {
    // is '-'
    if (value.length === 1 || value.charCodeAt(1) === ASCII_ZERO) {
      return false; // '-' cannot be standalone or followed by '0'
    }
    start = 1;
  } else if (initialCharCode === ASCII_ZERO) {
    return value.length === 1; // '0' can only be standalone, not leading
  }

  for (let i = start; i < value.length; i++) {
    const charCode = value.charCodeAt(i);

    if (charCode < ASCII_ZERO || charCode > ASCII_NINE) {
      // not between '0' and '9'
      return false;
    }
  }

  return true;
}
