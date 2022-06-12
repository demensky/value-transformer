import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import {macroDecoderThrow} from '../../../test-util/macro-decoder-throw.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {booleanDecoder} from './boolean-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<boolean>>;

test.beforeEach((t) => {
  t.context = booleanDecoder();
});

test('false', macroDecoder, [[0x00]], false);

test('true', macroDecoder, [[0x01]], true);

test('42', macroDecoderThrow, [[0x2a]]);
