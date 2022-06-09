import type {TestFn} from 'ava';
import anyTest from 'ava';

import {macroTransformation} from '../../../test-util/macro-transformation.js';
import {InvalidUnicodeError} from '../../error/invalid-unicode-error.js';

import {StringTransformer} from './string-transformer.js';

const test = anyTest as TestFn<StringTransformer>;

test.beforeEach((t) => {
  t.context = new StringTransformer();
});

test('empty string', macroTransformation, '', [0x00]);

test('simple string', macroTransformation, 'foo', [0x03, 0x66, 0x6f, 0x6f]);

test('broken unicode', (t) => {
  t.throws(() => {
    t.context.toLiteral('\ud83d');
  }, new InvalidUnicodeError());
});

// \u0000
test('null', macroTransformation, '\0', [0x01, 0x00]);

test('break line', macroTransformation, '\r\n', [0x02, 0x0d, 0x0a]);
