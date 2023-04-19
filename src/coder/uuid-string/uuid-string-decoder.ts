/* eslint-disable @typescript-eslint/no-magic-numbers */

import {BYTES_PER_UUID} from '../../const/bytes/bytes-per-uuid.js';
import type {Decoding} from '../../type/decoding.js';
import type {RestrictedDataView} from '../../type/restricted-data-view.js';
import type {UuidString} from '../../type/uuid-string.js';
import {getByteHexString} from '../../util/get-byte-hex-string.js';

export function* uuidStringDecoder<T extends UuidString>(): Decoding<T> {
  const view: RestrictedDataView = yield BYTES_PER_UUID;

  const result: string[] = [
    getByteHexString(view, 0x0),
    getByteHexString(view, 0x1),
    getByteHexString(view, 0x2),
    getByteHexString(view, 0x3),
    '-',
    getByteHexString(view, 0x4),
    getByteHexString(view, 0x5),
    '-',
    getByteHexString(view, 0x6),
    getByteHexString(view, 0x7),
    '-',
    getByteHexString(view, 0x8),
    getByteHexString(view, 0x9),
    '-',
    getByteHexString(view, 0xa),
    getByteHexString(view, 0xb),
    getByteHexString(view, 0xc),
    getByteHexString(view, 0xd),
    getByteHexString(view, 0xe),
    getByteHexString(view, 0xf),
  ];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result.join('') as T;
}
