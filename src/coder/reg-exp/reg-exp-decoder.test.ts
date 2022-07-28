import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import {macroDecoderThrow} from '../../../test-util/macro-decoder-throw.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {regExpDecoder} from './reg-exp-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<RegExp>>;

test.beforeEach((t) => {
  t.context = regExpDecoder();
});

test('empty', macroDecoder, [[0x00], [], [0x00], []], /(?:)/);

test(
  'empty group',
  macroDecoder,
  [[0x04], [0x28, 0x3f, 0x3a, 0x29], [0x00], []],
  /(?:)/,
);

test('no flags', macroDecoder, [[0x01], [0x61], [0x00], []], /a/);

test(
  'all flags',
  macroDecoder,
  [[0x01], [0x61], [0x07], [0x64, 0x67, 0x69, 0x6d, 0x73, 0x75, 0x79]],
  /a/dgimsuy,
);

test('invalid regexp', macroDecoderThrow, [[0x02], [0x61, 0x5b], [0x00], []]);
