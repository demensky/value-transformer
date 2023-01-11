/* istanbul ignore file */

import {parseHexInt} from '../src/util/parse-hex-int.js';

export function hexUint8(bytes: string): Uint8Array {
  const croppedBytes = bytes.trim();

  if (croppedBytes === '') {
    return new Uint8Array(0);
  }

  return Uint8Array.from(croppedBytes.split(/\s+/), (byte) => {
    if (!/^[\da-f]{2}$/.test(byte)) {
      throw new Error('Wrong string');
    }

    return parseHexInt(byte);
  });
}
