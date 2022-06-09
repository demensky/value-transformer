import test from 'ava';

import {denseArrayLike} from './dense-array-like.js';

test('empty array', (t) => {
  t.deepEqual([...denseArrayLike([])], []);
});

test('dense array', (t) => {
  t.deepEqual(
    [...denseArrayLike(['foo', 'bar', 'baz'])],
    ['foo', 'bar', 'baz'],
  );
});

test('partially sparse array', (t) => {
  const array: string[] = [];

  array[0] = 'foo';
  array[2] = 'baz';

  t.throws(() => {
    Array.from(denseArrayLike(array));
  });
});

test('fully sparse array', (t) => {
  const array: string[] = [];

  array.length = 3;

  t.throws(() => {
    Array.from(denseArrayLike(array));
  });
});
