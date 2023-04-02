import {expect, test} from 'vitest';

import {hexUint8} from '../../../test-util/hex-uint8.js';
import {DataViewChunk} from '../../data-view-chunk/data-view-chunk.js';

import {uintEncoder} from './uint-encoder.js';

function encode(value: number): Iterable<Uint8Array> {
  return DataViewChunk.encode(
    () => new ArrayBuffer(0x10000),
    uintEncoder(value),
  );
}

test('smallest in one byte', () => {
  expect(encode(0)).toIterator([hexUint8('00')]);
});

test('biggest in one byte', () => {
  expect(encode(127)).toIterator([hexUint8('7f')]);
});

test('smallest in two byte', () => {
  expect(encode(128)).toIterator([hexUint8('80 00')]);
});

test('biggest in two byte', () => {
  expect(encode(16_511)).toIterator([hexUint8('ff 7f')]);
});

test('smallest in three byte', () => {
  expect(encode(16_512)).toIterator([hexUint8('80 80 00')]);
});

test('biggest in three byte', () => {
  expect(encode(2_113_663)).toIterator([hexUint8('ff ff 7f')]);
});

test('max safe integer', () => {
  expect(encode(Number.MAX_SAFE_INTEGER)).toIterator([
    hexUint8('ff fe fe fe fe fe fe 0e'),
  ]);
});
