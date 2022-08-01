import {expect, test} from '@jest/globals';

import {uintEncode} from './uint-encode.js';

test('smallest in one byte', () => {
  expect([...uintEncode(0)]).toStrictEqual([new Uint8Array([0x00])]);
});

test('biggest in one byte', () => {
  expect([...uintEncode(127)]).toStrictEqual([new Uint8Array([0x7f])]);
});

test('smallest in two byte', () => {
  expect([...uintEncode(128)]).toStrictEqual([new Uint8Array([0x80, 0x01])]);
});

test('biggest in two byte', () => {
  expect([...uintEncode(16383)]).toStrictEqual([new Uint8Array([0xff, 0x7f])]);
});

test('smallest in three byte', () => {
  expect([...uintEncode(16384)]).toStrictEqual([
    new Uint8Array([0x80, 0x80, 0x01]),
  ]);
});

test('biggest in three byte', () => {
  expect([...uintEncode(2097151)]).toStrictEqual([
    new Uint8Array([0xff, 0xff, 0x7f]),
  ]);
});

test('max safe integer', () => {
  expect([...uintEncode(Number.MAX_SAFE_INTEGER)]).toStrictEqual([
    new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0f]),
  ]);
});
