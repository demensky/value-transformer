import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroEncode} from '../../../test-util/macro-encode.js';
import {macroEncodeThrow} from '../../../test-util/macro-encode-throw.js';
import type {EncodeFactory} from '../../type/encode-factory.js';

import {stringEncode} from './string-encode.js';

const test = anyTest as TestFn<EncodeFactory<string>>;

test.beforeEach((t) => {
  t.context = stringEncode;
});

test('empty string', macroEncode, '', [[0x00], []]);

test('simple string', macroEncode, 'foo', [[0x03], [0x66, 0x6f, 0x6f]]);

test('broken unicode', macroEncodeThrow, '\ud83d');

// \u0000
test('null', macroEncode, '\0', [[0x01], [0x00]]);

test('break line', macroEncode, '\r\n', [[0x02], [0x0d, 0x0a]]);
