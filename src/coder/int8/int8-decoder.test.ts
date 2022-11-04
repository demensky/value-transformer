import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {int8Decoder} from './int8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = int8Decoder();
});

test('min', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('80')]], -128);
});

test('42', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('2a')]], 42);
});

test('max', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('7f')]], 127);
});
