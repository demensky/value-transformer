import {expect, test, vi} from 'vitest';

import {every} from './every.js';

test('no items', () => {
  const mockPredicate = vi.fn(() => false);
  const result: boolean = every<never>([], mockPredicate);

  expect(result).toBe(true);
  expect(mockPredicate).toHaveBeenCalledTimes(0);
});

test('one non-matching', () => {
  const mockPredicate = vi.fn(() => false);
  const result: boolean = every<string>(['foo'], mockPredicate);

  expect(result).toBe(false);
  expect(mockPredicate).toHaveBeenCalledTimes(1);
  expect(mockPredicate).toHaveBeenCalledWith('foo');
});

test('one matching', () => {
  const mockPredicate = vi.fn(() => true);
  const result: boolean = every<string>(['foo'], mockPredicate);

  expect(result).toBe(true);
  expect(mockPredicate).toHaveBeenCalledTimes(1);
  expect(mockPredicate).toHaveBeenCalledWith('foo');
});

test('many non-matching', () => {
  const mockPredicate = vi.fn(() => false);
  const result: boolean = every<string>(['foo', 'bar', 'baz'], mockPredicate);

  expect(result).toBe(false);
  expect(mockPredicate).toHaveBeenCalledTimes(1);
  expect(mockPredicate).toHaveBeenCalledWith('foo');
});

test('many matching only first', () => {
  const mockPredicate = vi.fn(() => false).mockImplementationOnce(() => true);

  const result: boolean = every<string>(['foo', 'bar', 'baz'], mockPredicate);

  expect(result).toBe(false);
  expect(mockPredicate).toHaveBeenCalledTimes(2);
  expect(mockPredicate).toHaveBeenNthCalledWith(1, 'foo');
  expect(mockPredicate).toHaveBeenNthCalledWith(2, 'bar');
});

test('many matching first and second', () => {
  const mockPredicate = vi
    .fn(() => false)
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => true);

  const result: boolean = every<string>(['foo', 'bar', 'baz'], mockPredicate);

  expect(result).toBe(false);
  expect(mockPredicate).toHaveBeenCalledTimes(3);
  expect(mockPredicate).toHaveBeenNthCalledWith(1, 'foo');
  expect(mockPredicate).toHaveBeenNthCalledWith(2, 'bar');
  expect(mockPredicate).toHaveBeenNthCalledWith(3, 'baz');
});

test('many matching every', () => {
  const mockPredicate = vi.fn(() => true);

  const result: boolean = every<string>(['foo', 'bar', 'baz'], mockPredicate);

  expect(result).toBe(true);
  expect(mockPredicate).toHaveBeenCalledTimes(3);
  expect(mockPredicate).toHaveBeenNthCalledWith(1, 'foo');
  expect(mockPredicate).toHaveBeenNthCalledWith(2, 'bar');
  expect(mockPredicate).toHaveBeenNthCalledWith(3, 'baz');
});
