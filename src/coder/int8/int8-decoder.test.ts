import {beforeEach, expect, test} from '@jest/globals';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = uint8Decoder();
});

test('min', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('00')]], 0);
});

test('42', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('2a')]], 42);
});

test('max', () => {
  expect(generator).toYieldsReturn([[1, hexDataView('ff')]], 255);
});
