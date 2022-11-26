import {beforeEach, expect, test} from 'vitest';

import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {bigIntDecoder} from './big-int-decoder.js';

let generator: DecoderGenerator<bigint>;

beforeEach(() => {
  generator = bigIntDecoder();
});

test('1 byte 0', () => {
  expect(generator).toDecode(0n, ['00']);
});

test('1 byte biggest positive', () => {
  expect(generator).toDecode(63n, ['3f']);
});

test('1 byte smallest positive', () => {
  expect(generator).toDecode(1n, ['01']);
});

test('1 byte biggest negative', () => {
  expect(generator).toDecode(-64n, ['40']);
});

test('1 byte smallest negative', () => {
  expect(generator).toDecode(-1n, ['7f']);
});

test('2 bytes biggest positive', () => {
  expect(generator).toDecode(8191n, ['ff', '3f']);
});

test('2 bytes smallest positive', () => {
  expect(generator).toDecode(128n, ['80', '01']);
});

test('2 bytes biggest negative', () => {
  expect(generator).toDecode(-8192n, ['80', '40']);
});

test('2 bytes smallest negative', () => {
  expect(generator).toDecode(-65n, ['bf', '7f']);
});
