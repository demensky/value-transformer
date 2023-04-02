import {beforeEach, expect, test} from 'vitest';

import type {Decoding} from '../../type/decoding.js';

import {bigIntDecoder} from './big-int-decoder.js';

let decoding: Decoding<bigint>;

beforeEach(() => {
  decoding = bigIntDecoder();
});

test('1 byte 0', () => {
  expect(decoding).toDecode(0n, ['00']);
});

test('1 byte biggest positive', () => {
  expect(decoding).toDecode(63n, ['3f']);
});

test('1 byte smallest positive', () => {
  expect(decoding).toDecode(1n, ['01']);
});

test('1 byte biggest negative', () => {
  expect(decoding).toDecode(-64n, ['40']);
});

test('1 byte smallest negative', () => {
  expect(decoding).toDecode(-1n, ['7f']);
});

test('2 bytes biggest positive', () => {
  expect(decoding).toDecode(8191n, ['ff', '3f']);
});

test('2 bytes smallest positive', () => {
  expect(decoding).toDecode(128n, ['80', '01']);
});

test('2 bytes biggest negative', () => {
  expect(decoding).toDecode(-8192n, ['80', '40']);
});

test('2 bytes smallest negative', () => {
  expect(decoding).toDecode(-65n, ['bf', '7f']);
});
