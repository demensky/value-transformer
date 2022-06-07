import test from 'ava';

import {every} from './every.js';

test('no items', (t) => {
  t.plan(0);

  every([], () => {
    t.fail();

    return true;
  });
});

test('one non-matching', (t) => {
  t.plan(2);

  t.false(
    every(['foo'], (item) => {
      t.is(item, 'foo');

      return false;
    }),
  );
});

test('one matching', (t) => {
  t.plan(2);

  t.true(
    every(['foo'], (item) => {
      t.is(item, 'foo');

      return true;
    }),
  );
});

test('many non-matching', (t) => {
  t.plan(2);

  t.false(
    every(['foo', 'bar', 'baz'], (item) => {
      t.is(item, 'foo');

      return false;
    }),
  );
});

test('many matching only first', (t) => {
  t.plan(3);

  let index = 0;

  t.false(
    every(['foo', 'bar', 'baz'], (item) => {
      switch (index++) {
        case 0:
          t.is(item, 'foo');
          return true;
        case 1:
          t.is(item, 'bar');
          return false;
        default:
          return t.fail();
      }
    }),
  );
});

test('many matching first and second', (t) => {
  t.plan(4);

  let index = 0;

  t.false(
    every(['foo', 'bar', 'baz'], (item) => {
      switch (index++) {
        case 0:
          t.is(item, 'foo');
          return true;
        case 1:
          t.is(item, 'bar');
          return true;
        case 2:
          t.is(item, 'baz');
          return false;
        default:
          return t.fail();
      }
    }),
  );
});

test('many matching every', (t) => {
  t.plan(4);

  let index = 0;

  t.true(
    every(['foo', 'bar', 'baz'], (item) => {
      switch (index++) {
        case 0:
          t.is(item, 'foo');
          return true;
        case 1:
          t.is(item, 'bar');
          return true;
        case 2:
          t.is(item, 'baz');
          return true;
        default:
          return t.fail();
      }
    }),
  );
});
