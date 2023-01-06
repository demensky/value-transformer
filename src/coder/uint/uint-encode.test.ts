import {expect, test} from 'vitest';

import {uintEncode} from './uint-encode.js';

test('smallest in one byte', () => {
  expect([...uintEncode(0)]).toStrictEqual([new Uint8Array([0x00])]);
});

test('biggest in one byte', () => {
  expect([...uintEncode(127)]).toStrictEqual([new Uint8Array([0x7f])]);
});

test('smallest in two byte', () => {
  expect([...uintEncode(128)]).toStrictEqual([new Uint8Array([0x80, 0x00])]);
});

test('biggest in two byte', () => {
  expect([...uintEncode(16_511)]).toStrictEqual([new Uint8Array([0xff, 0x7f])]);
});

test('smallest in three byte', () => {
  expect([...uintEncode(16_512)]).toStrictEqual([
    new Uint8Array([0x80, 0x80, 0x00]),
  ]);
});

test('biggest in three byte', () => {
  expect([...uintEncode(2_113_663)]).toStrictEqual([
    new Uint8Array([0xff, 0xff, 0x7f]),
  ]);
});

test('max safe integer', () => {
  expect([...uintEncode(Number.MAX_SAFE_INTEGER)]).toStrictEqual([
    new Uint8Array([0xff, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0xfe, 0x0e]),
  ]);
});
