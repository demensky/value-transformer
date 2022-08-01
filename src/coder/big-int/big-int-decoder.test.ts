import {beforeEach, expect, test} from '@jest/globals';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {bigIntDecoder} from './big-int-decoder.js';

let generator: DecoderGenerator<bigint>;

beforeEach(() => {
  generator = bigIntDecoder();
});

test('1 byte 0', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('00')]], 0n);
});

test('1 byte biggest positive', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('3f')]], 63n);
});

test('1 byte smallest positive', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('01')]], 1n);
});

test('1 byte biggest negative', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('40')]], -64n);
});

test('1 byte smallest negative', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('7f')]], -1n);
});

test('2 bytes biggest positive', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('ff')],
      [1, hexDataView('3f')],
    ],
    8191n,
  );
});

test('2 bytes smallest positive', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('80')],
      [1, hexDataView('01')],
    ],
    128n,
  );
});

test('2 bytes biggest negative', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('80')],
      [1, hexDataView('40')],
    ],
    -8192n,
  );
});

test('2 bytes smallest negative', () => {
  expect(generator).toYieldsReturn(
    [
      [1, hexDataView('bf')],
      [1, hexDataView('7f')],
    ],
    -65n,
  );
});
