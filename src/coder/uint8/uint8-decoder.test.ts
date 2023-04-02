import {beforeEach, expect, test} from 'vitest';

import type {Decoding} from '../../type/decoding.js';

import {uint8Decoder} from './uint8-decoder.js';

let decoding: Decoding<number>;

beforeEach(() => {
  decoding = uint8Decoder();
});

test('0', () => {
  expect(decoding).toDecode(0, ['00']);
});

test('42', () => {
  expect(decoding).toDecode(42, ['2a']);
});

test('255', () => {
  expect(decoding).toDecode(255, ['ff']);
});
