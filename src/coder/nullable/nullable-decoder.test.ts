import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {nullableDecoder} from './nullable-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let generator: DecoderGenerator<number | null>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  generator = nullableDecoder(mockDecoder);
});

test('null', () => {
  expect(generator).toDecode(null, ['00']);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('not null', () => {
  expect(generator).toDecode(0x0a, ['01', '0a']);

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('invalid control byte', () => {
  expect(generator).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('02')],
  ]);

  expect(mockDecoder).not.toHaveBeenCalled();
});
