import {expect, test} from '@jest/globals';

import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';
import {OutOfMaxByteLengthError} from '../../error/out-of-max-byte-length-error.js';

import {stringEncode} from './string-encode.js';

test('empty string', () => {
  const iterator: Iterator<ArrayBufferView> =
    stringEncode('')[Symbol.iterator]();

  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([0x00]),
  });
  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([]),
  });
  expect(iterator.next()).toStrictEqual({done: true, value: undefined});
});

test('simple string', () => {
  const iterator: Iterator<ArrayBufferView> =
    stringEncode('foo')[Symbol.iterator]();

  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([0x03]),
  });
  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([0x66, 0x6f, 0x6f]),
  });
  expect(iterator.next()).toStrictEqual({done: true, value: undefined});
});

test('broken unicode', () => {
  const iterator: Iterator<ArrayBufferView> =
    stringEncode('\ud83d')[Symbol.iterator]();

  expect(() => {
    iterator.next();
  }).toThrow(InvalidUnicodeError);
});

test('break line', () => {
  const iterator: Iterator<ArrayBufferView> =
    stringEncode('\r\n')[Symbol.iterator]();

  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([0x02]),
  });
  expect(iterator.next()).toStrictEqual({
    done: false,
    value: new Uint8Array([0x0d, 0x0a]),
  });
  expect(iterator.next()).toStrictEqual({done: true, value: undefined});
});

test('too long string', () => {
  const value = 'a'.repeat(0x10001);
  const iterator: Iterator<ArrayBufferView> =
    stringEncode(value)[Symbol.iterator]();

  expect(() => {
    iterator.next();
  }).toThrow(OutOfMaxByteLengthError);
});
