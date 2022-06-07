import test from 'ava';

import {isDecimalIntString} from './is-decimal-int-string.js';

test('decimal digits', (t) => {
  t.true(isDecimalIntString('0'));
  t.true(isDecimalIntString('1'));
  t.true(isDecimalIntString('42'));
  t.true(isDecimalIntString('9007199254740991'));
  t.true(isDecimalIntString('18446744073709551615'));
  t.true(isDecimalIntString('340282366920938463463374607431768211455'));
});

test('minus and decimal digits', (t) => {
  t.true(isDecimalIntString('-1'));
  t.true(isDecimalIntString('-42'));
  t.true(isDecimalIntString('-9007199254740991'));
  t.true(isDecimalIntString('-18446744073709551615'));
  t.true(isDecimalIntString('-340282366920938463463374607431768211455'));
});

test('minus zero', (t) => {
  t.false(isDecimalIntString('-0'));
});

test('decimal digits have extra zero', (t) => {
  t.false(isDecimalIntString('01'));
  t.false(isDecimalIntString('000042'));
});

test('empty string', (t) => {
  t.false(isDecimalIntString(''));
});

test('minus', (t) => {
  t.false(isDecimalIntString('-'));
});

test('letters', (t) => {
  t.false(isDecimalIntString('abc'));
});

test('decimal digits have spaces', (t) => {
  t.false(isDecimalIntString('  42'));
  t.false(isDecimalIntString('42  '));
  t.false(isDecimalIntString('4  2'));
});

test('decimal digits have plus', (t) => {
  t.false(isDecimalIntString('+0'));
  t.false(isDecimalIntString('+1'));
  t.false(isDecimalIntString('+42'));
  t.false(isDecimalIntString('+9007199254740991'));
  t.false(isDecimalIntString('+18446744073709551615'));
});
