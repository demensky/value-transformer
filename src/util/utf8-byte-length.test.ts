import {expect, test} from 'vitest';

import {utf8ByteLength} from './utf8-byte-length.js';

function getBytesLengthSlow(value: string): number {
  return new TextEncoder().encode(value).length;
}

test('empty string', () => {
  const value = '';
  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('ASCII characters', () => {
  const value = 'Hello, World!';

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('latin small letter a with ring, diaeresis, o with diaeresis', () => {
  const value = 'åäö';

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('CJK Unified Ideographs (Chinese, Japanese, and Korean)', () => {
  const value = '漢字';

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('Surrogate pairs: MUSICAL SYMBOL G CLEF and CJK Ideograph Extension B', () => {
  // Surrogate pairs (4-byte characters)
  const value = '\uD834\uDF06\uD841\uDF0D'; //  (MUSICAL SYMBOL G CLEF with surrogate pair) and  (CJK Ideograph Extension B)

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('mixed: ASCII, 3-byte characters, and surrogate pairs', () => {
  const value = 'Hello, 世界\uD834\uDF06!';

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});

test('wides char', () => {
  const value = '﷽';

  expect(utf8ByteLength(value)).toBe(getBytesLengthSlow(value));
});
