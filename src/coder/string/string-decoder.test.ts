import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {stringDecoder} from './string-decoder.js';

let generator: DecoderGenerator<string>;

beforeEach(() => {
  generator = stringDecoder();
});

test('empty string', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('00')],
      [0, hexDataView('')],
    ],
    '',
  );
});

test('simple string', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('03')],
      [3, hexDataView('66 6f 6f')],
    ],
    'foo',
  );
});

test('broken unicode', () => {
  expect(generator).toYieldsThrow(
    [
      [1, hexDataView('03')],
      [3, hexDataView('f0 9f a5')],
    ],
    InvalidBufferValueError,
  );
});

test('null', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('01')],
      [1, hexDataView('00')],
    ],
    '\0',
  );
});

test('break line', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('02')],
      [2, hexDataView('0d 0a')],
    ],
    '\r\n',
  );
});

test('byte length of the string is greater than the limit', () => {
  expect(generator).toYieldsThrow(
    [
      [1, hexDataView('81')],
      [1, hexDataView('80')],
      [1, hexDataView('04')],
    ],
    OutOfMaxByteLengthError,
  );
});
