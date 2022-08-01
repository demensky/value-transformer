/* istanbul ignore file */

import type {ReadonlyLittleEndianDataView} from '../src/type/readonly-little-endian-data-view.js';
import {parseHexInt} from '../src/util/parse-hex-int.js';

export function hexDataView(bytes: string): ReadonlyLittleEndianDataView {
  const hexes = bytes.match(/[\da-f]{2}/g) ?? [];

  return new DataView(Uint8Array.from(hexes, parseHexInt).buffer);
}
