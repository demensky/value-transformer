import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroDecoder} from '../../../test-util/macro-decoder.js';
import {macroDecoderThrow} from '../../../test-util/macro-decoder-throw.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {stringDecoder} from './string-decoder.js';

const test = anyTest as TestFn<DecoderGenerator<string>>;

test.beforeEach((t) => {
  t.context = stringDecoder();
});

test('empty string', macroDecoder, [[0x00], []], '');

test('simple string', macroDecoder, [[0x03], [0x66, 0x6f, 0x6f]], 'foo');

test('broken unicode', macroDecoderThrow, [[0x03], [0xf0, 0x9f, 0xa5]]);

test('null', macroDecoder, [[0x01], [0x00]], '\0' /* \u0000 */);

test('break line', macroDecoder, [[0x02], [0x0d, 0x0a]], '\r\n');
