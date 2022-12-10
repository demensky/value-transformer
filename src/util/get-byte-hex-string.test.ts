import {expect, test} from 'vitest';

import {hexDataView} from '../../test-util/hex-data-view.js';

import {getByteHexString} from './get-byte-hex-string.js';

test('0', () => {
  expect(getByteHexString(hexDataView('00'), 0)).toBe('00');
});

test('ff', () => {
  expect(getByteHexString(hexDataView('ff'), 0)).toBe('ff');
});

test('2a', () => {
  expect(getByteHexString(hexDataView('2a'), 0)).toBe('2a');
});

test('out of range', () => {
  expect(() => {
    getByteHexString(hexDataView('00'), 42);
  }).toThrow(RangeError);
});
