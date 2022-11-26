import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {float64Decoder} from './float64-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = float64Decoder();
});

test('NaN', () => {
  expect(generator).toDecode(NaN, ['00 00 00 00 00 00 f8 7f']);
});

test('-Infinity', () => {
  expect(generator).toDecode(-Infinity, ['00 00 00 00 00 00 f0 ff']);
});

test('Number.MIN_SAFE_INTEGER', () => {
  expect(generator).toDecode(Number.MIN_SAFE_INTEGER, [
    'ff ff ff ff ff ff 3f c3',
  ]);
});

test('0', () => {
  expect(generator).toDecode(0, ['00 00 00 00 00 00 00 00']);
});

test('Number.MIN_VALUE', () => {
  expect(generator).toDecode(Number.MIN_VALUE, ['01 00 00 00 00 00 00 00']);
});

test('Number.EPSILON', () => {
  expect(generator).toDecode(Number.EPSILON, ['00 00 00 00 00 00 b0 3c']);
});

test('0.3', () => {
  expect(generator).toDecode(0.3, ['33 33 33 33 33 33 d3 3f']);
});

test('42', () => {
  expect(generator).toDecode(42, ['00 00 00 00 00 00 45 40']);
});

test('Number.MAX_SAFE_INTEGER', () => {
  expect(generator).toDecode(Number.MAX_SAFE_INTEGER, [
    'ff ff ff ff ff ff 3f 43',
  ]);
});

test('Number.MAX_VALUE', () => {
  expect(generator).toDecode(Number.MAX_VALUE, ['ff ff ff ff ff ff ef 7f']);
});

test('Infinity', () => {
  expect(generator).toDecode(Infinity, ['00 00 00 00 00 00 f0 7f']);
});
