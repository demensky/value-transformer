import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';
import type {UuidString} from '../../type/uuid-string.js';

import {uuidStringDecoder} from './uuid-string-decoder.js';

let generator: DecoderGenerator<UuidString>;

beforeEach(() => {
  generator = uuidStringDecoder();
});

test('simple', () => {
  expect(generator).toDecode('00112233-4455-6677-8899-aabbccddeeff', [
    '00 11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff',
  ]);
});

test('nil', () => {
  expect(generator).toDecode('00000000-0000-0000-0000-000000000000', [
    '00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
  ]);
});

test('max', () => {
  expect(generator).toDecode('ffffffff-ffff-ffff-ffff-ffffffffffff', [
    'ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff',
  ]);
});
