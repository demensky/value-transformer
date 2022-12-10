import {HEX_BYTE_STRING_LENGTH} from '../const/hex-byte-string-length.js';
import {HEX_RADIX} from '../const/hex-radix.js';
import type {RestrictedDataView} from '../type/restricted-data-view.js';

export function getByteHexString(
  view: RestrictedDataView,
  byteOffset: number,
): string {
  return view
    .getUint8(byteOffset)
    .toString(HEX_RADIX)
    .padStart(HEX_BYTE_STRING_LENGTH, '0');
}
