import test from 'ava';

import {isUuidString} from './is-uuid-string.js';

test('smallest', (t) => {
  t.true(isUuidString('00000000-0000-0000-0000-000000000000'));
});

test('biggest', (t) => {
  t.true(isUuidString('ffffffff-ffff-ffff-ffff-ffffffffffff'));
});

test('every chars', (t) => {
  t.true(isUuidString('00112233-4455-6677-8899-aabbccddeeff'));
});

test('empty string', (t) => {
  t.false(isUuidString(''));
});

test('uuid without dashes', (t) => {
  t.false(isUuidString('00112233445566778899aabbccddeeff'));
});

test('UPPER_CASE uuid', (t) => {
  t.false(isUuidString('00112233-4455-6677-8899-AABBCCDDEEFF'));
});

test('spaces', (t) => {
  t.false(isUuidString('00112233-4455-6677-8899-aabbccddeeff '));
  t.false(isUuidString(' 00112233-4455-6677-8899-aabbccddeeff'));
});
