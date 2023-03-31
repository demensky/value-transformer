/* eslint-disable @typescript-eslint/no-magic-numbers */

import type {Encoding} from '../../type/encoding.js';
import type {UuidString} from '../../type/uuid-string.js';
import {isUuidString} from '../../util/guard/is-uuid-string.js';
import {parseHexInt} from '../../util/parse-hex-int.js';

export function* uuidStringEncode(value: UuidString): Encoding {
  console.assert(isUuidString<UuidString>(value));

  (yield 16).setView((view, offset) => {
    view.setUint8(offset + 0, parseHexInt(value.slice(0, 2)));
    view.setUint8(offset + 1, parseHexInt(value.slice(2, 4)));
    view.setUint8(offset + 2, parseHexInt(value.slice(4, 6)));
    view.setUint8(offset + 3, parseHexInt(value.slice(6, 8)));

    view.setUint8(offset + 4, parseHexInt(value.slice(9, 11)));
    view.setUint8(offset + 5, parseHexInt(value.slice(11, 13)));

    view.setUint8(offset + 6, parseHexInt(value.slice(14, 16)));
    view.setUint8(offset + 7, parseHexInt(value.slice(16, 18)));

    view.setUint8(offset + 8, parseHexInt(value.slice(19, 21)));
    view.setUint8(offset + 9, parseHexInt(value.slice(21, 23)));

    view.setUint8(offset + 10, parseHexInt(value.slice(24, 26)));
    view.setUint8(offset + 11, parseHexInt(value.slice(26, 28)));
    view.setUint8(offset + 12, parseHexInt(value.slice(28, 30)));
    view.setUint8(offset + 13, parseHexInt(value.slice(30, 32)));
    view.setUint8(offset + 14, parseHexInt(value.slice(32, 34)));
    view.setUint8(offset + 15, parseHexInt(value.slice(34, 36)));
  });
}
