import {beforeEach, expect, test} from 'vitest';

import type {Decoding} from '../../type/decoding.js';

import {float64Decoder} from './float64-decoder.js';

let decoding: Decoding<number>;

beforeEach(() => {
  decoding = float64Decoder();
});

test('NaN', () => {
  expect(decoding).toDecode(NaN, ['00 00 00 00 00 00 f8 7f']);
});

test('-Infinity', () => {
  expect(decoding).toDecode(-Infinity, ['00 00 00 00 00 00 f0 ff']);
});

test('Number.MIN_SAFE_INTEGER', () => {
  expect(decoding).toDecode(Number.MIN_SAFE_INTEGER, [
    'ff ff ff ff ff ff 3f c3',
  ]);
});

test('0', () => {
  expect(decoding).toDecode(0, ['00 00 00 00 00 00 00 00']);
});

test('Number.MIN_VALUE', () => {
  expect(decoding).toDecode(Number.MIN_VALUE, ['01 00 00 00 00 00 00 00']);
});

test('Number.EPSILON', () => {
  expect(decoding).toDecode(Number.EPSILON, ['00 00 00 00 00 00 b0 3c']);
});

test('0.3', () => {
  expect(decoding).toDecode(0.3, ['33 33 33 33 33 33 d3 3f']);
});

test('42', () => {
  expect(decoding).toDecode(42, ['00 00 00 00 00 00 45 40']);
});

test('Number.MAX_SAFE_INTEGER', () => {
  expect(decoding).toDecode(Number.MAX_SAFE_INTEGER, [
    'ff ff ff ff ff ff 3f 43',
  ]);
});

test('Number.MAX_VALUE', () => {
  expect(decoding).toDecode(Number.MAX_VALUE, ['ff ff ff ff ff ff ef 7f']);
});

test('Infinity', () => {
  expect(decoding).toDecode(Infinity, ['00 00 00 00 00 00 f0 7f']);
});
