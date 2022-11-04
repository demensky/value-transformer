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
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('00')],
      [0, hexDataView('')],
      [1, hexDataView('00')],
      [0, hexDataView('')],
    ],
    /(?:)/,
  );
});

test('empty group', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('04')],
      [4, hexDataView('28 3f 3a 29')],
      [1, hexDataView('00')],
      [0, hexDataView('')],
    ],
    /(?:)/,
  );
});

test('no flags', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('01')],
      [1, hexDataView('61')],
      [1, hexDataView('00')],
      [0, hexDataView('')],
    ],
    /a/,
  );
});

test('all flags', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('01')],
      [1, hexDataView('61')],
      [1, hexDataView('07')],
      [7, hexDataView('64 67 69 6d 73 75 79')],
    ],
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
    ],
    InvalidBufferValueError,
  );
});
