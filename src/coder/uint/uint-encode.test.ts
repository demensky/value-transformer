import {expect, test} from 'vitest';

import {hexUint8} from '../../../test-util/hex-uint8.js';

import {uintEncode} from './uint-encode.js';

test('smallest in one byte', () => {
  expect(uintEncode(0)).toIterator([hexUint8('00')]);
});

test('biggest in one byte', () => {
  expect(uintEncode(127)).toIterator([hexUint8('7f')]);
});

test('smallest in two byte', () => {
  expect(uintEncode(128)).toIterator([hexUint8('80 00')]);
});

test('biggest in two byte', () => {
  expect(uintEncode(16_511)).toIterator([hexUint8('ff 7f')]);
});

test('smallest in three byte', () => {
  expect(uintEncode(16_512)).toIterator([hexUint8('80 80 00')]);
});

test('biggest in three byte', () => {
  expect(uintEncode(2_113_663)).toIterator([hexUint8('ff ff 7f')]);
});

test('max safe integer', () => {
  expect(uintEncode(Number.MAX_SAFE_INTEGER)).toIterator([
    hexUint8('ff fe fe fe fe fe fe 0e'),
  ]);
});
