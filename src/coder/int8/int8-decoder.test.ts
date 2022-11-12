import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {int8Decoder} from './int8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = int8Decoder();
});

test('min', () => {
  expect(generator).toDecode(['80'], -128);
});

test('0', () => {
  expect(generator).toDecode(['00'], 0);
});

test('42', () => {
  expect(generator).toDecode(['2a'], 42);
});

test('max', () => {
  expect(generator).toDecode(['7f'], 127);
});
