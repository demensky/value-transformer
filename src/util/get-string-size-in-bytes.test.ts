import {expect, test} from 'vitest';

import {getStringSizeInBytes} from './get-string-size-in-bytes.js';

function getBytesLengthSlow(value: string): number {
  return new TextEncoder().encode(value).length;
}

test('empty string', () => {
  expect(getStringSizeInBytes('')).toBe(getBytesLengthSlow(''));
});

test("string 'foo'", () => {
  expect(getStringSizeInBytes('foo')).toBe(getBytesLengthSlow('foo'));
});

test("string '🔥🔥🔥'", () => {
  expect(getStringSizeInBytes('🔥🔥🔥')).toBe(getBytesLengthSlow('🔥🔥🔥'));
});

test("string '﷽'", () => {
  expect(getStringSizeInBytes('﷽')).toBe(getBytesLengthSlow('﷽'));
});
