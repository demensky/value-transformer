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
  expect(generator).toDecode('', ['00', '']);
});

test('simple string', () => {
  expect(generator).toDecode('foo', ['03', '66 6f 6f']);
});

test('broken unicode', () => {
  expect(generator).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('03')],
    [3, hexDataView('f0 9f a5')],
  ]);
});

test('null', () => {
  expect(generator).toDecode('\0', ['01', '00']);
});

test('break line', () => {
  expect(generator).toDecode('\r\n', ['02', '0d 0a']);
});

test('byte length of the string is greater than the limit', () => {
  expect(generator).toYieldsThrow(OutOfMaxByteLengthError, [
    [1, hexDataView('81')],
    [1, hexDataView('80')],
    [1, hexDataView('04')],
  ]);
});
