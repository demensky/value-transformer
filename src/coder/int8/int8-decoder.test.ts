import {beforeEach, expect, test} from 'vitest';

import type {Decoding} from '../../type/decoding.js';

import {int8Decoder} from './int8-decoder.js';

let decoding: Decoding<number>;

beforeEach(() => {
  decoding = int8Decoder();
});

test('min', () => {
  expect(decoding).toDecode(-128, ['80']);
});

test('0', () => {
  expect(decoding).toDecode(0, ['00']);
});

test('42', () => {
  expect(decoding).toDecode(42, ['2a']);
});

test('max', () => {
  expect(decoding).toDecode(127, ['7f']);
});
