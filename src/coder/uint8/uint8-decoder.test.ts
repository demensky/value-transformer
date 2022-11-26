import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {uint8Decoder} from './uint8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = uint8Decoder();
});

test('0', () => {
  expect(generator).toDecode(0, ['00']);
});

test('42', () => {
  expect(generator).toDecode(42, ['2a']);
});

test('255', () => {
  expect(generator).toDecode(255, ['ff']);
});
