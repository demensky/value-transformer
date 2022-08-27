/* eslint-disable @typescript-eslint/no-magic-numbers */

import type {UuidString} from '../../type/uuid-string.js';
import {parseHexInt} from '../../util/parse-hex-int.js';

export function uuidStringEncode(value: UuidString): ArrayBufferView {
  return new Uint8Array([
    parseHexInt(value.slice(0, 2)),
    parseHexInt(value.slice(2, 4)),
    parseHexInt(value.slice(4, 6)),
    parseHexInt(value.slice(6, 8)),

    parseHexInt(value.slice(9, 11)),
    parseHexInt(value.slice(11, 13)),

    parseHexInt(value.slice(14, 16)),
    parseHexInt(value.slice(16, 18)),

    parseHexInt(value.slice(19, 21)),
    parseHexInt(value.slice(21, 23)),

    parseHexInt(value.slice(24, 26)),
    parseHexInt(value.slice(26, 28)),
    parseHexInt(value.slice(28, 30)),
    parseHexInt(value.slice(30, 32)),
    parseHexInt(value.slice(32, 34)),
    parseHexInt(value.slice(34, 36)),
  ]);
}
