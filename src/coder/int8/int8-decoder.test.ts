import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {int8Decoder} from './int8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = int8Decoder();
});

test('min', () => {
  expect(generator).toDecode(-128, ['80']);
});

test('0', () => {
  expect(generator).toDecode(0, ['00']);
});

test('42', () => {
  expect(generator).toDecode(42, ['2a']);
});

test('max', () => {
  expect(generator).toDecode(127, ['7f']);
});
