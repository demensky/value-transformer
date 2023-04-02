import {beforeEach, expect, test} from 'vitest';

import type {Decoding} from '../../type/decoding.js';
import type {UuidString} from '../../type/uuid-string.js';

import {uuidStringDecoder} from './uuid-string-decoder.js';

let decoding: Decoding<UuidString>;

beforeEach(() => {
  decoding = uuidStringDecoder();
});

test('simple', () => {
  expect(decoding).toDecode('00112233-4455-6677-8899-aabbccddeeff', [
    '00 11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff',
  ]);
});

test('nil', () => {
  expect(decoding).toDecode('00000000-0000-0000-0000-000000000000', [
    '00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00',
  ]);
});

test('max', () => {
  expect(decoding).toDecode('ffffffff-ffff-ffff-ffff-ffffffffffff', [
    'ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff ff',
  ]);
});
