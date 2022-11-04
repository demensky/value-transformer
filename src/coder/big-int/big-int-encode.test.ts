import {expect, test} from 'vitest';

import {bigIntEncode} from './big-int-encode.js';

test('1 byte 0', () => {
  expect([...bigIntEncode(0n)]).toStrictEqual([new Uint8Array([0x00])]);
});

test('1 byte biggest positive', () => {
  expect([...bigIntEncode(63n)]).toStrictEqual([new Uint8Array([0x3f])]);
});

test('1 byte smallest positive', () => {
  expect([...bigIntEncode(1n)]).toStrictEqual([new Uint8Array([0x01])]);
});

test('1 byte biggest negative', () => {
  expect([...bigIntEncode(-64n)]).toStrictEqual([new Uint8Array([0x40])]);
});

test('1 byte smallest negative', () => {
  expect([...bigIntEncode(-1n)]).toStrictEqual([new Uint8Array([0x7f])]);
});

test('2 bytes biggest positive', () => {
  expect([...bigIntEncode(8191n)]).toStrictEqual([
    new Uint8Array([0xff, 0x3f]),
  ]);
});

test('2 bytes smallest positive', () => {
  expect([...bigIntEncode(128n)]).toStrictEqual([new Uint8Array([0x80, 0x01])]);
});

test('2 bytes biggest negative', () => {
  expect([...bigIntEncode(-8192n)]).toStrictEqual([
    new Uint8Array([0x80, 0x40]),
  ]);
});

test('2 bytes smallest negative', () => {
  expect([...bigIntEncode(-65n)]).toStrictEqual([new Uint8Array([0xbf, 0x7f])]);
});
