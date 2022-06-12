import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {uintDecoder} from './uint-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<number>>;

test.beforeEach((t) => {
  t.context = uintDecoder();
});

test('smallest in one byte', macroDecoder, [[0x00]], 0);

test('biggest in one byte', macroDecoder, [[0x7f]], 127);

test('smallest in two byte', macroDecoder, [[0x80], [0x1]], 128);

test('biggest in two byte', macroDecoder, [[0xff], [0x7f]], 16383);

test('smallest in three byte', macroDecoder, [[0x80], [0x80], [0x01]], 16384);

test('biggest in three byte', macroDecoder, [[0xff], [0xff], [0x7f]], 2097151);

test(
  'max safe integer',
  macroDecoder,
  [[0xff], [0xff], [0xff], [0xff], [0xff], [0xff], [0xff], [0x0f]],
  Number.MAX_SAFE_INTEGER,
);
