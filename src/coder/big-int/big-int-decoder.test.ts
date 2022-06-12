import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {bigIntDecoder} from './big-int-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<bigint>>;

test.beforeEach((t) => {
  t.context = bigIntDecoder();
});

test('1 byte 0', macroDecoder, [[0x00]], 0n);

test('1 byte biggest positive', macroDecoder, [[0x3f]], 63n);

test('1 byte smallest positive', macroDecoder, [[0x01]], 1n);

test('1 byte biggest negative', macroDecoder, [[0x40]], -64n);

test('1 byte smallest negative', macroDecoder, [[0x7f]], -1n);

test('2 bytes biggest positive', macroDecoder, [[0xff], [0x3f]], 8191n);

test('2 bytes smallest positive', macroDecoder, [[0x80], [0x1]], 128n);

test('2 bytes biggest negative', macroDecoder, [[0x80], [0x40]], -8192n);

test('2 bytes smallest negative', macroDecoder, [[0xbf], [0x7f]], -65n);
