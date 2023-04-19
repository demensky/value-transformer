import {expect, test} from 'vitest';

import {isEntry} from './is-entry.js';

test('empty array', () => {
  expect(isEntry([])).toBe(false);
});

test('array with 1 item', () => {
  expect(isEntry(['foo'])).toBe(false);
});

test('array with 2 items', () => {
  expect(isEntry(['foo', 'bar'])).toBe(true);
});

test('array with 3 items', () => {
  expect(isEntry(['foo', 'bar', 'baz'])).toBe(false);
});
