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
  expect(generator).toYieldsReturn([[1, hexDataView('00')]], null);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('not null', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('01')],
      [1, hexDataView('0a')],
    ],
    0x0a,
  );

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('invalid control byte', () => {
  expect(generator).toYieldsThrow(
    [[1, hexDataView('02')]],
    InvalidBufferValueError,
  );

  expect(mockDecoder).not.toHaveBeenCalled();
});
