import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {setDecoder} from './set-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let generator: DecoderGenerator<ReadonlySet<number>>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  generator = setDecoder(mockDecoder);
});

test('empty set', () => {
  expect(generator).toDecode(['00'], new Set());

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('single value', () => {
  expect(generator).toDecode(['01', '0a'], new Set([0x0a]));

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('many values', () => {
  expect(generator).toDecode(
    ['03', '0a', '0b', '0c'],
    new Set([0x0a, 0x0b, 0x0c]),
  );

  expect(mockDecoder).toHaveBeenCalledTimes(3);
});

test('out of max size', () => {
  expect(generator).toYieldsThrow(
    [
      [1, hexDataView('81')],
      [1, hexDataView('80')],
      [1, hexDataView('04')],
    ],
    OutOfMaxLengthError,
  );

  expect(mockDecoder).not.toHaveBeenCalled();
});
