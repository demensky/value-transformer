import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {uintDecoder} from './uint-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = uintDecoder();
});

test('smallest in one byte', () => {
  expect(generator).toDecode(0, ['00']);
});

test('biggest in one byte', () => {
  expect(generator).toDecode(127, ['7f']);
});

test('smallest in two byte', () => {
  expect(generator).toDecode(128, ['80', '01']);
});

test('biggest in two byte', () => {
  expect(generator).toDecode(16383, ['ff', '7f']);
});

test('smallest in three byte', () => {
  expect(generator).toDecode(16384, ['80', '80', '01']);
});

test('biggest in three byte', () => {
  expect(generator).toDecode(2097151, ['ff', 'ff', '7f']);
});

test('max safe integer', () => {
  expect(generator).toDecode(Number.MAX_SAFE_INTEGER, [
    'ff',
    'ff',
    'ff',
    'ff',
    'ff',
    'ff',
    'ff',
    '0f',
  ]);
});

test('too big value', () => {
  expect(generator).toYieldsThrow(OutOfMaxLengthError, [
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
