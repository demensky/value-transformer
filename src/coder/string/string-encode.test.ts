import {expect, test, vi} from 'vitest';

import {hexUint8} from '../../../test-util/hex-uint8.js';
import {DataViewChunk} from '../../data-view-chunk/data-view-chunk.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';

import {stringEncode} from './string-encode.js';

vi.mock('../../config/coder-config.ts');

function encode(value: string): Iterable<Uint8Array> {
  return DataViewChunk.encode(
    () => new ArrayBuffer(0x10000),
    stringEncode(value),
  );
}

test('empty string', () => {
  expect(encode('')).toIterator([hexUint8('00')]);
});

test('simple string', () => {
  expect(encode('foo')).toIterator([hexUint8('03 66 6f 6f')]);
});

test('broken unicode', () => {
  expect(encode('\ud83d')).toYieldsThrow(InvalidUnicodeError, []);
});

test('break line', () => {
  expect(encode('\r\n')).toIterator([hexUint8('02 0d 0a')]);
});

test('too long string', () => {
  expect(encode('01234567890123456789!')).toYieldsThrow(
    OutOfMaxByteLengthError,
    [],
  );
});
