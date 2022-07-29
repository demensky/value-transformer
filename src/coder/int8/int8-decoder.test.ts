import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';
import {uint8Decoder} from '../uint8/uint8-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<number>>;

test.beforeEach((t) => {
  t.context = uint8Decoder();
});

test('min', macroDecoder, [[0x00]], 0);

test('42', macroDecoder, [[0x2a]], 42);

test('max', macroDecoder, [[0xff]], 255);
