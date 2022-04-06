/* eslint-disable @typescript-eslint/no-magic-numbers */

import {HEX_RADIX} from '../../const/hex-radix';
import type {UuidString} from '../../type/uuid-string';

function getOctetFromHexString(value: UuidString, offset: number): number {
  return parseInt(value.slice(offset, offset + 2), HEX_RADIX);
}

export function uuidStringEncode(value: UuidString): ArrayBufferView {
  return new Uint8Array([
    getOctetFromHexString(value, 0),
    getOctetFromHexString(value, 2),
    getOctetFromHexString(value, 4),
    getOctetFromHexString(value, 6),

    getOctetFromHexString(value, 9),
    getOctetFromHexString(value, 11),

    getOctetFromHexString(value, 14),
    getOctetFromHexString(value, 16),

    getOctetFromHexString(value, 19),
    getOctetFromHexString(value, 21),

    getOctetFromHexString(value, 24),
    getOctetFromHexString(value, 26),
    getOctetFromHexString(value, 28),
    getOctetFromHexString(value, 30),
    getOctetFromHexString(value, 32),
    getOctetFromHexString(value, 34),
  ]);
}
