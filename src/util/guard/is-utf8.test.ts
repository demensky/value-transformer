import {expect, test} from 'vitest';

import {isUtf8} from './is-utf8.js';

test('empty string', () => {
  expect(isUtf8('')).toBe(true);
});

test('simple string', () => {
  expect(isUtf8('a')).toBe(true);
});

test('paired surrogates', () => {
  expect(isUtf8('a\uD83D\uDE0Ab')).toBe(true);
});

test('only paired surrogates', () => {
  expect(isUtf8('\uD83D\uDE0A')).toBe(true);
});

test('unpaired low surrogates', () => {
  expect(isUtf8('a\uD800b')).toBe(false);
  expect(isUtf8('a\uD83Db')).toBe(false);
  expect(isUtf8('a\uDBFFb')).toBe(false);
});

test('only unpaired low surrogates', () => {
  expect(isUtf8('\uD800')).toBe(false);
  expect(isUtf8('\uD83D')).toBe(false);
  expect(isUtf8('\uDBFF')).toBe(false);
});

test('unpaired high surrogates', () => {
  expect(isUtf8('a\uDC00b')).toBe(false);
  expect(isUtf8('a\uDE0Ab')).toBe(false);
  expect(isUtf8('a\uDFFFb')).toBe(false);
});

test('only unpaired high surrogates', () => {
  expect(isUtf8('\uDC00')).toBe(false);
  expect(isUtf8('\uDE0A')).toBe(false);
  expect(isUtf8('\uDFFF')).toBe(false);
});
