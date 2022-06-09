import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroEncode} from '../../../test-util/macro-encode.js';
import type {EncodeFactory} from '../../type/encode-factory.js';

import {bigIntEncode} from './big-int-encode.js';

const test = anyTest as TestFn<EncodeFactory<bigint>>;

test.beforeEach((t) => {
  t.context = bigIntEncode;
});

test('1 byte 0', macroEncode, 0n, [[0x00]]);

test('1 byte biggest positive', macroEncode, 63n, [[0x3f]]);

test('1 byte smallest positive', macroEncode, 1n, [[0x01]]);

test('1 byte biggest negative', macroEncode, -64n, [[0x40]]);

test('1 byte smallest negative', macroEncode, -1n, [[0x7f]]);

test('2 bytes biggest positive', macroEncode, 8191n, [[0xff, 0x3f]]);

test('2 bytes smallest positive', macroEncode, 128n, [[0x80, 0x01]]);

test('2 bytes biggest negative', macroEncode, -8192n, [[0x80, 0x40]]);

test('2 bytes smallest negative', macroEncode, -65n, [[0xbf, 0x7f]]);
