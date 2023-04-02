import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {Decoding} from '../../type/decoding.js';

import {uintDecoder} from './uint-decoder.js';

let decoding: Decoding<number>;

beforeEach(() => {
  decoding = uintDecoder();
});

test('smallest in one byte', () => {
  expect(decoding).toDecode(0, ['00']);
});

test('biggest in one byte', () => {
  expect(decoding).toDecode(127, ['7f']);
});

test('smallest in two byte', () => {
  expect(decoding).toDecode(128, ['80', '00']);
});

test('biggest in two byte', () => {
  expect(decoding).toDecode(16_511, ['ff', '7f']);
});

test('smallest in three byte', () => {
  expect(decoding).toDecode(16_512, ['80', '80', '00']);
});

test('biggest in three byte', () => {
  expect(decoding).toDecode(2_113_663, ['ff', 'ff', '7f']);
});

test('max safe integer', () => {
  expect(decoding).toDecode(Number.MAX_SAFE_INTEGER, [
    'ff',
    'fe',
    'fe',
    'fe',
    'fe',
    'fe',
    'fe',
    '0e',
  ]);
});

test('too big value', () => {
  expect(decoding).toYieldsThrow(OutOfMaxLengthError, [
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
    [1, hexDataView('ff')],
  ]);
});
