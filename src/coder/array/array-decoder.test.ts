import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {arrayDecoder} from './array-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let generator: DecoderGenerator<readonly number[]>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  generator = arrayDecoder(mockDecoder);
});

test('empty array', () => {
  expect(generator).toDecode(['00'], []);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('single item', () => {
  expect(generator).toDecode(['01', '0a'], [0x0a]);

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('many items', () => {
  expect(generator).toDecode(['03', '0a', '0b', '0c'], [0x0a, 0x0b, 0x0c]);

  expect(mockDecoder).toHaveBeenCalledTimes(3);
});

test('out of max length', () => {
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
