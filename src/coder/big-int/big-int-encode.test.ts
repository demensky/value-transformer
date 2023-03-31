import {expect, test} from 'vitest';

import {hexUint8} from '../../../test-util/hex-uint8.js';
import {DataViewChunk} from '../../data-view-chunk/data-view-chunk.js';

import {bigIntEncode} from './big-int-encode.js';

function encode(value: bigint): Iterable<Uint8Array> {
  return DataViewChunk.encode(
    () => new ArrayBuffer(0x10000),
    bigIntEncode(value),
  );
}

test('1 byte 0', () => {
  expect(encode(0n)).toIterator([hexUint8('00')]);
});

test('1 byte biggest positive', () => {
  expect(encode(63n)).toIterator([hexUint8('3f')]);
});

test('1 byte smallest positive', () => {
  expect(encode(1n)).toIterator([hexUint8('01')]);
});

test('1 byte biggest negative', () => {
  expect(encode(-64n)).toIterator([hexUint8('40')]);
});

test('1 byte smallest negative', () => {
  expect(encode(-1n)).toIterator([hexUint8('7f')]);
});

test('2 bytes biggest positive', () => {
  expect(encode(8191n)).toIterator([hexUint8('ff 3f')]);
});

test('2 bytes smallest positive', () => {
  expect(encode(128n)).toIterator([hexUint8('80 01')]);
});

test('2 bytes biggest negative', () => {
  expect(encode(-8192n)).toIterator([hexUint8('80 40')]);
});

test('2 bytes smallest negative', () => {
  expect(encode(-65n)).toIterator([hexUint8('bf 7f')]);
});
