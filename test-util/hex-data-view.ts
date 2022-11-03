/* istanbul ignore file */

import type {RestrictedDataView} from '../src/type/restricted-data-view.js';
import {parseHexInt} from '../src/util/parse-hex-int.js';

export function hexDataView(bytes: string): RestrictedDataView {
  const croppedBytes = bytes.trim();

  if (croppedBytes === '') {
    return new DataView(new ArrayBuffer(0));
  }

  return new DataView(
    Uint8Array.from(croppedBytes.split(/\s+/), (byte) => {
      if (!/^[\da-f]{2}$/.test(byte)) {
        throw new Error('Wrong string');
      }

      return parseHexInt(byte);
    }).buffer,
  );
}
