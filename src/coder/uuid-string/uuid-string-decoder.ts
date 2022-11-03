/* eslint-disable @typescript-eslint/no-magic-numbers */

import {BYTES_PER_UUID} from '../../const/bytes-per-uuid.js';
import {HEX_RADIX} from '../../const/hex-radix.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {RestrictedDataView} from '../../type/restricted-data-view.js';
import type {UuidString} from '../../type/uuid-string.js';

function getOctetHexString(
  view: RestrictedDataView,
  byteOffset: number,
): string {
  return (0x100 + view.getUint8(byteOffset)).toString(HEX_RADIX).slice(-2);
}

export function* uuidStringDecoder<
  T extends UuidString,
>(): DecoderGenerator<T> {
  const view: RestrictedDataView = yield BYTES_PER_UUID;

  const result: string[] = [
    getOctetHexString(view, 0x0),
    getOctetHexString(view, 0x1),
    getOctetHexString(view, 0x2),
    getOctetHexString(view, 0x3),
    '-',
    getOctetHexString(view, 0x4),
    getOctetHexString(view, 0x5),
    '-',
    getOctetHexString(view, 0x6),
    getOctetHexString(view, 0x7),
    '-',
    getOctetHexString(view, 0x8),
    getOctetHexString(view, 0x9),
    '-',
    getOctetHexString(view, 0xa),
    getOctetHexString(view, 0xb),
    getOctetHexString(view, 0xc),
    getOctetHexString(view, 0xd),
    getOctetHexString(view, 0xe),
    getOctetHexString(view, 0xf),
  ];

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result.join('') as T;
}
