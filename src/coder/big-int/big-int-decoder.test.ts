import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {bigIntDecoder} from './big-int-decoder.js';

let generator: DecoderGenerator<bigint>;

beforeEach(() => {
  generator = bigIntDecoder();
});

test('1 byte 0', () => {
  expect(generator).toDecode(['00'], 0n);
});

test('1 byte biggest positive', () => {
  expect(generator).toDecode(['3f'], 63n);
});

test('1 byte smallest positive', () => {
  expect(generator).toDecode(['01'], 1n);
});

test('1 byte biggest negative', () => {
  expect(generator).toDecode(['40'], -64n);
});

test('1 byte smallest negative', () => {
  expect(generator).toDecode(['7f'], -1n);
});

test('2 bytes biggest positive', () => {
  expect(generator).toDecode(['ff', '3f'], 8191n);
});

test('2 bytes smallest positive', () => {
  expect(generator).toDecode(['80', '01'], 128n);
});

test('2 bytes biggest negative', () => {
  expect(generator).toDecode(['80', '40'], -8192n);
});

test('2 bytes smallest negative', () => {
  expect(generator).toDecode(['bf', '7f'], -65n);
});
