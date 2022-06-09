import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroEncode} from '../../../test-util/macro-encode.js';
import type {EncodeFactory} from '../../type/encode-factory.js';

import {uintEncode} from './uint-encode.js';

const test = anyTest as TestFn<EncodeFactory<number>>;

test.beforeEach((t) => {
  t.context = uintEncode;
});

test('smallest in one byte', macroEncode, 0, [[0x00]]);

test('biggest in one byte', macroEncode, 127, [[0x7f]]);

test('smallest in two byte', macroEncode, 128, [[0x80, 0x01]]);

test('biggest in two byte', macroEncode, 16383, [[0xff, 0x7f]]);

test('smallest in three byte', macroEncode, 16384, [[0x80, 0x80, 0x01]]);

test('biggest in three byte', macroEncode, 2097151, [[0xff, 0xff, 0x7f]]);

test('max safe integer', macroEncode, Number.MAX_SAFE_INTEGER, [
  [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x0f],
]);
