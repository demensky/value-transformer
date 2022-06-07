import test from 'ava';

import {isBigInt} from './is-big-int.js';

test('boolean', (t) => {
  t.false(isBigInt(false));
  t.false(isBigInt(true));
});

test('nil', (t) => {
  t.false(isBigInt(null));
  t.false(isBigInt(undefined));
});

test('string', (t) => {
  t.false(isBigInt(''));
  t.false(isBigInt('0'));
  t.false(isBigInt('-0'));
  t.false(isBigInt('1'));
  t.false(isBigInt('-1'));
  t.false(isBigInt('42'));
});

test('number', (t) => {
  t.false(isBigInt(0));
  t.false(isBigInt(1));
  t.false(isBigInt(-1));
  t.false(isBigInt(Infinity));
  t.false(isBigInt(-Infinity));
  t.false(isBigInt(NaN));
});

test('object', (t) => {
  t.false(isBigInt({}));
  t.false(isBigInt([]));
});

test('boxed BigInt object', (t) => {
  t.false(isBigInt(Object(0n)));
});

test('bigint', (t) => {
  t.true(isBigInt(0n));
  t.true(isBigInt(1n));
  t.true(isBigInt(9007199254740992n));
});
