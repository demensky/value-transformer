import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoding} from '../../type/decoding.js';

import {arrayDecoder} from './array-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let decoding: Decoding<readonly number[]>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  decoding = arrayDecoder(mockDecoder);
});

test('empty array', () => {
  expect(decoding).toDecode([], ['00']);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('single item', () => {
  expect(decoding).toDecode([0x0a], ['01', '0a']);

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('many items', () => {
  expect(decoding).toDecode([0x0a, 0x0b, 0x0c], ['03', '0a', '0b', '0c']);

  expect(mockDecoder).toHaveBeenCalledTimes(3);
});

test('out of max length', () => {
  expect(decoding).toYieldsThrow(OutOfMaxLengthError, [
    [1, hexDataView('81')],
    [1, hexDataView('80')],
    [1, hexDataView('04')],
  ]);

  expect(mockDecoder).not.toHaveBeenCalled();
});
