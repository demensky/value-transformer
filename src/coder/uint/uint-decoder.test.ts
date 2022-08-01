import {beforeEach, expect, test} from '@jest/globals';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {OutOfMaxLengthError} from '../../error/out-of-max-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {uintDecoder} from './uint-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = uintDecoder();
});

test('smallest in one byte', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('00')]], 0);
});

test('biggest in one byte', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('7f')]], 127);
});

test('smallest in two byte', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('80')],
      [1, hexDataView('01')],
    ],
    128,
  );
});

test('biggest in two byte', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('ff')],
      [1, hexDataView('7f')],
    ],
    16383,
  );
});

test('smallest in three byte', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('80')],
      [1, hexDataView('80')],
      [1, hexDataView('01')],
    ],
    16384,
  );
});

test('biggest in three byte', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('7f')],
    ],
    2097151,
  );
});

test('max safe integer', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('0f')],
    ],
    Number.MAX_SAFE_INTEGER,
  );
});

test('too big value', () => {
  expect(generator).toYieldsThrow(
    [
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
      [1, hexDataView('ff')],
    ],
    OutOfMaxLengthError,
  );
});
