import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {regExpDecoder} from './reg-exp-decoder.js';

let generator: DecoderGenerator<RegExp>;

beforeEach(() => {
  generator = regExpDecoder();
});

test('empty', () => {
  expect(generator).toDecode(
    ['00', '', '00', '', '00 00 00 00 00 00 00 00'],
    /(?:)/,
  );
});

test('empty group', () => {
  expect(generator).toDecode(
    ['04', '28 3f 3a 29', '00', '', '00 00 00 00 00 00 00 00'],
    /(?:)/,
  );
});

test('no flags', () => {
  expect(generator).toDecode(
    ['01', '61', '00', '', '00 00 00 00 00 00 00 00'],
    /a/,
  );
});

test('all flags', () => {
  expect(generator).toDecode(
    ['01', '61', '07', '64 67 69 6d 73 75 79', '00 00 00 00 00 00 00 00'],
    /a/dgimsuy,
  );
});

test('invalid regexp', () => {
  expect(generator).toYieldsThrow(
    [
      [1, hexDataView('02')],
      [2, hexDataView('61 5b')],
      [1, hexDataView('00')],
      [0, hexDataView('')],
      [8, hexDataView('00 00 00 00 00 00 00 00')],
    ],
    InvalidBufferValueError,
  );
});
