import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';

import {nullableDecoder} from './nullable-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let decoding: Decoding<number | null>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  decoding = nullableDecoder(mockDecoder);
});

test('null', () => {
  expect(decoding).toDecode(null, ['00']);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('not null', () => {
  expect(decoding).toDecode(0x0a, ['01', '0a']);

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('invalid control byte', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('02')],
  ]);

  expect(mockDecoder).not.toHaveBeenCalled();
});
