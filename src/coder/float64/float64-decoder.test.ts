import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {float64Decoder} from './float64-decoder.js';

let generator: DecoderGenerator<number>;

beforeEach(() => {
  generator = float64Decoder();
});

test('NaN', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 f8 7f'], NaN);
});

test('-Infinity', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 f0 ff'], -Infinity);
});

test('Number.MIN_SAFE_INTEGER', () => {
  expect(generator).toDecode(
    ['ff ff ff ff ff ff 3f c3'],
    Number.MIN_SAFE_INTEGER,
  );
});

test('0', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 00 00'], 0);
});

test('Number.MIN_VALUE', () => {
  expect(generator).toDecode(['01 00 00 00 00 00 00 00'], Number.MIN_VALUE);
});

test('Number.EPSILON', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 b0 3c'], Number.EPSILON);
});

test('0.3', () => {
  expect(generator).toDecode(['33 33 33 33 33 33 d3 3f'], 0.3);
});

test('42', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 45 40'], 42);
});

test('Number.MAX_SAFE_INTEGER', () => {
  expect(generator).toDecode(
    ['ff ff ff ff ff ff 3f 43'],
    Number.MAX_SAFE_INTEGER,
  );
});

test('Number.MAX_VALUE', () => {
  expect(generator).toDecode(['ff ff ff ff ff ff ef 7f'], Number.MAX_VALUE);
});

test('Infinity', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 f0 7f'], Infinity);
});
