import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {mockByteDecoder} from '../../../test-util/mock-byte-decoder.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoding} from '../../type/decoding.js';

import {setDecoder} from './set-decoder.js';

let mockDecoder: ReturnType<typeof mockByteDecoder>;
let decoding: Decoding<ReadonlySet<number>>;

beforeEach(() => {
  mockDecoder = mockByteDecoder();
  decoding = setDecoder(mockDecoder);
});

test('empty set', () => {
  expect(decoding).toDecode(new Set(), ['00']);

  expect(mockDecoder).not.toHaveBeenCalled();
});

test('single value', () => {
  expect(decoding).toDecode(new Set([0x0a]), ['01', '0a']);

  expect(mockDecoder).toHaveBeenCalledTimes(1);
});

test('many values', () => {
  expect(decoding).toDecode(new Set([0x0a, 0x0b, 0x0c]), [
    '03',
    '0a',
    '0b',
    '0c',
  ]);

  expect(mockDecoder).toHaveBeenCalledTimes(3);
});

test('out of max size', () => {
  expect(decoding).toYieldsThrow(OutOfMaxLengthError, [
    [1, hexDataView('81')],
    [1, hexDataView('80')],
    [1, hexDataView('04')],
  ]);

  expect(mockDecoder).not.toHaveBeenCalled();
});
