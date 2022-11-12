import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {uint8Decoder} from './uint8-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = uint8Decoder();
});

test('0', () => {
  expect(generator).toDecode(['00'], 0);
});

test('42', () => {
  expect(generator).toDecode(['2a'], 42);
});

test('255', () => {
  expect(generator).toDecode(['ff'], 255);
});
