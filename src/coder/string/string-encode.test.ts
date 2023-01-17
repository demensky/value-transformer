import {expect, test, vi} from 'vitest';

import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';

import {stringEncode} from './string-encode.js';

vi.mock('../../config/coder-config.ts');

test('empty string', () => {
  expect(stringEncode('')).toYieldsReturn(undefined, [
    [new Uint8Array([0x00]), undefined],
    [new Uint8Array([]), undefined],
  ]);
});

test('simple string', () => {
  expect(stringEncode('foo')).toYieldsReturn(undefined, [
    [new Uint8Array([0x03]), undefined],
    [new Uint8Array([0x66, 0x6f, 0x6f]), undefined],
  ]);
});

test('broken unicode', () => {
  expect(stringEncode('\ud83d')).toYieldsThrow(InvalidUnicodeError, []);
});

test('break line', () => {
  expect(stringEncode('\r\n')).toYieldsReturn(undefined, [
    [new Uint8Array([0x02]), undefined],
    [new Uint8Array([0x0d, 0x0a]), undefined],
  ]);
});

test('too long string', () => {
  expect(stringEncode('01234567890123456789!')).toYieldsThrow(
    OutOfMaxByteLengthError,
    [],
  );
});
