import {describe, expect, test} from 'vitest';

import {isWellFormed} from '../is-well-formed.js';

describe('true cases', () => {
  test('empty string', () => {
    expect(isWellFormed('')).toBe(true);
  });

  test('no surrogates', () => {
    expect(isWellFormed('foo bar')).toBe(true);
  });

  test('valid surrogate pair only', () => {
    expect(isWellFormed('\uD800\uDC00')).toBe(true);
  });

  test('valid surrogate pairs at the beginning', () => {
    expect(isWellFormed('\uD800\uDC00foo bar')).toBe(true);
  });

  test('valid surrogate pairs in the middle', () => {
    expect(isWellFormed('foo\uD800\uDC00 bar')).toBe(true);
  });

  test('valid surrogate pairs at the end', () => {
    expect(isWellFormed('foo bar\uD800\uDC00')).toBe(true);
  });

  test('multiple valid surrogate pairs', () => {
    expect(isWellFormed('\uD800\uDC00foo\uD800\uDC00 bar\uD800\uDC00')).toBe(
      true,
    );
  });
});

describe('false cases with unpaired high surrogate', () => {
  test('unpaired high surrogate only', () => {
    expect(isWellFormed('\uD800')).toBe(false);
  });

  test('unpaired high surrogate at the beginning', () => {
    expect(isWellFormed('\uD800foo bar')).toBe(false);
  });

  test('unpaired high surrogate in the middle', () => {
    expect(isWellFormed('foo\uD800 bar')).toBe(false);
  });

  test('unpaired high surrogate at the end', () => {
    expect(isWellFormed('foo bar\uD800')).toBe(false);
  });
});

describe('false cases with unpaired low surrogate', () => {
  test('unpaired low surrogate only', () => {
    expect(isWellFormed('\uDC00')).toBe(false);
  });

  test('unpaired low surrogate at the beginning', () => {
    expect(isWellFormed('\uDC00foo bar')).toBe(false);
  });

  test('unpaired low surrogate in the middle', () => {
    expect(isWellFormed('foo\uDC00 bar')).toBe(false);
  });

  test('unpaired low surrogate at the end', () => {
    expect(isWellFormed('foo bar\uDC00')).toBe(false);
  });
});
