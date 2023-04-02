import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';
import type {ReadonlyDate} from '../../type/readonly-date.js';

import {dateDecoder} from './date-decoder.js';

let decoding: Decoding<ReadonlyDate>;

beforeEach(() => {
  decoding = dateDecoder();
});

test('min', () => {
  expect(decoding).toDecode(new Date(-8640000000000000), [
    '00 00 dc c2 08 b2 3e c3',
  ]);
});

test('zero', () => {
  expect(decoding).toDecode(new Date(0), ['00 00 00 00 00 00 00 00']);
});

test('invalid date', () => {
  expect(decoding).toDecode(new Date(NaN), ['00 00 00 00 00 00 f8 7f']);
});

test('december 4, 1995', () => {
  expect(decoding).toDecode(new Date(Date.UTC(1995, 3, 4)), [
    '00 00 00 5c c4 31 67 42',
  ]);
});

test('fraction', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [8, hexDataView('33 03 00 5c c4 31 67 42')],
  ]);
});

test('max', () => {
  expect(decoding).toDecode(new Date(8640000000000000), [
    '00 00 dc c2 08 b2 3e 43',
  ]);
});

test('max save integer', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [8, hexDataView('ff ff ff ff ff ff 3f 43')],
  ]);
});

test('max value', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [8, hexDataView('ff ff ff ff ff ff ef 7f')],
  ]);
});
