import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {UuidString} from '../../type/uuid-string.js';

import {uuidStringDecoder} from './uuid-string-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<UuidString>>;

test.beforeEach((t) => {
  t.context = uuidStringDecoder<UuidString>();
});

test(
  'simple',
  macroDecoder,
  [
    [
      0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb,
      0xcc, 0xdd, 0xee, 0xff,
    ],
  ],
  '00112233-4455-6677-8899-aabbccddeeff',
);

test(
  'nil',
  macroDecoder,
  [
    [
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
    ],
  ],
  '00000000-0000-0000-0000-000000000000',
);

test(
  'max',
  macroDecoder,
  [
    [
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff, 0xff, 0xff, 0xff,
    ],
  ],
  'ffffffff-ffff-ffff-ffff-ffffffffffff',
);

// test('simple string', macroDecoder, [[0x03], [0x66, 0x6f, 0x6f]], 'foo');
//
// test('broken unicode', macroDecoderThrow, [[0x03], [0xf0, 0x9f, 0xa5]]);
//
// test('null', macroDecoder, [[0x01], [0x00]], '\0' /* \u0000 */);
//
// test('break line', macroDecoder, [[0x02], [0x0d, 0x0a]], '\r\n');
