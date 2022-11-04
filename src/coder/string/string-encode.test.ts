import {expect, test} from 'vitest';

import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';

import {stringEncode} from './string-encode.js';

test('empty string', () => {
  expect(stringEncode('')).toYieldsReturn(
    [
      [new Uint8Array([0x00]), undefined],
      [new Uint8Array([]), undefined],
    ],
    undefined,
  );
});

test('simple string', () => {
  expect(stringEncode('foo')).toYieldsReturn(
    [
      [new Uint8Array([0x03]), undefined],
      [new Uint8Array([0x66, 0x6f, 0x6f]), undefined],
    ],
    undefined,
  );
});

test('broken unicode', () => {
  expect(stringEncode('\ud83d')).toYieldsThrow([], InvalidUnicodeError);
});

test('break line', () => {
  expect(stringEncode('\r\n')).toYieldsReturn(
    [
      [new Uint8Array([0x02]), undefined],
      [new Uint8Array([0x0d, 0x0a]), undefined],
    ],
    undefined,
  );
});

test('too long string', () => {
  expect(stringEncode('a'.repeat(0x10001))).toYieldsThrow(
    [],
    OutOfMaxByteLengthError,
  );
});
