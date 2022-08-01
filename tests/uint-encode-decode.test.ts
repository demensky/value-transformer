import {expect, test} from '@jest/globals';

import {uintDecoder} from '../src/coder/uint/uint-decoder.js';
import {uintEncode} from '../src/coder/uint/uint-encode.js';
import {createEncoderDecoder} from '../test-util/create-encoder-decoder.js';

const uintEncodeDecode = createEncoderDecoder(uintEncode, uintDecoder);

test('smallest in one byte', () => {
  expect(uintEncodeDecode(0)).toBe(0);
});

test('biggest in one byte', () => {
  expect(uintEncodeDecode(127)).toBe(127);
});

test('smallest in two byte', () => {
  expect(uintEncodeDecode(128)).toBe(128);
});

test('biggest in two byte', () => {
  expect(uintEncodeDecode(16383)).toBe(16383);
});

test('smallest in three byte', () => {
  expect(uintEncodeDecode(16384)).toBe(16384);
});

test('biggest in three byte', () => {
  expect(uintEncodeDecode(2097151)).toBe(2097151);
});

test('max safe integer', () => {
  expect(uintEncodeDecode(Number.MAX_SAFE_INTEGER)).toBe(
    Number.MAX_SAFE_INTEGER,
  );
});
