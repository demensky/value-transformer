import test from 'ava';

import {isValidUnicode} from './is-valid-unicode.js';

test('empty string', (t) => {
  t.true(isValidUnicode(''));
});

test('simple string', (t) => {
  t.true(isValidUnicode('a'));
});

test('paired surrogates', (t) => {
  t.true(isValidUnicode('a\uD83D\uDE0Ab'));
});

test('only paired surrogates', (t) => {
  t.true(isValidUnicode('\uD83D\uDE0A'));
});

test('unpaired low surrogates', (t) => {
  t.false(isValidUnicode('a\uD800b'));
  t.false(isValidUnicode('a\uD83Db'));
  t.false(isValidUnicode('a\uDBFFb'));
});

test('only unpaired low surrogates', (t) => {
  t.false(isValidUnicode('\uD800'));
  t.false(isValidUnicode('\uD83D'));
  t.false(isValidUnicode('\uDBFF'));
});

test('unpaired high surrogates', (t) => {
  t.false(isValidUnicode('a\uDC00b'));
  t.false(isValidUnicode('a\uDE0Ab'));
  t.false(isValidUnicode('a\uDFFFb'));
});

test('only unpaired high surrogates', (t) => {
  t.false(isValidUnicode('\uDC00'));
  t.false(isValidUnicode('\uDE0A'));
  t.false(isValidUnicode('\uDFFF'));
});
