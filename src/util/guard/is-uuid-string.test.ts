import {expect, test} from '@jest/globals';

import {isUuidString} from './is-uuid-string.js';

test('smallest', () => {
  expect(isUuidString('00000000-0000-0000-0000-000000000000')).toBe(true);
});

test('biggest', () => {
  expect(isUuidString('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(true);
});

test('every chars', () => {
  expect(isUuidString('00112233-4455-6677-8899-aabbccddeeff')).toBe(true);
});

test('empty string', () => {
  expect(isUuidString('')).toBe(false);
});

test('uuid without dashes', () => {
  expect(isUuidString('00112233445566778899aabbccddeeff')).toBe(false);
});

test('uPPER_CASE uuid', () => {
  expect(isUuidString('00112233-4455-6677-8899-AABBCCDDEEFF')).toBe(false);
});

test('spaces', () => {
  expect(isUuidString('00112233-4455-6677-8899-aabbccddeeff ')).toBe(false);
  expect(isUuidString(' 00112233-4455-6677-8899-aabbccddeeff')).toBe(false);
});
