import {expect, test} from 'vitest';

import {SparseArrayError} from '../error/sparse-array-error.js';

import {denseArrayLike} from './dense-array-like.js';

test('empty array', () => {
  expect([...denseArrayLike([])]).toStrictEqual([]);
});

test('dense array', () => {
  expect([...denseArrayLike(['foo', 'bar', 'baz'])]).toStrictEqual([
    'foo',
    'bar',
    'baz',
  ]);
});

test('partially sparse array', () => {
  const array: string[] = [];

  array[0] = 'foo';
  array[2] = 'baz';

  expect(() => {
    Array.from(denseArrayLike(array));
  }).toThrow(SparseArrayError);
});

test('fully sparse array', () => {
  const array: string[] = [];

  array.length = 3;

  expect(() => {
    Array.from(denseArrayLike(array));
  }).toThrow(SparseArrayError);
});
