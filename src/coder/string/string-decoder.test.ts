import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';
import type {Decoding} from '../../type/decoding.js';

import {stringDecoder} from './string-decoder.js';

let decoding: Decoding<string>;

beforeEach(() => {
  decoding = stringDecoder();
});

test('empty string', () => {
  expect(decoding).toDecode('', ['00', '']);
});

test('simple string', () => {
  expect(decoding).toDecode('foo', ['03', '66 6f 6f']);
});

test('broken unicode', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('03')],
    [3, hexDataView('f0 9f a5')],
  ]);
});

test('null', () => {
  expect(decoding).toDecode('\0', ['01', '00']);
});

test('break line', () => {
  expect(decoding).toDecode('\r\n', ['02', '0d 0a']);
});

test('byte length of the string is greater than the limit', () => {
  expect(decoding).toYieldsThrow(OutOfMaxByteLengthError, [
    [1, hexDataView('81')],
    [1, hexDataView('80')],
    [1, hexDataView('04')],
  ]);
});
