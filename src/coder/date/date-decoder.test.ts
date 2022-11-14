import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {dateDecoder} from './date-decoder.js';

let generator: DecoderGenerator<Date>;

beforeEach(() => {
  generator = dateDecoder();
});

test('min', () => {
  expect(generator).toDecode(
    ['00 00 dc c2 08 b2 3e c3'],
    new Date(-8640000000000000),
  );
});

test('zero', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 00 00'], new Date(0));
});

test('invalid date', () => {
  expect(generator).toDecode(['00 00 00 00 00 00 f8 7f'], new Date(NaN));
});

test('december 4, 1995', () => {
  expect(generator).toDecode(
    ['00 00 00 5c c4 31 67 42'],
    new Date(Date.UTC(1995, 3, 4)),
  );
});

test('fraction', () => {
  expect(generator).toYieldsThrow(
    [[8, hexDataView('33 03 00 5c c4 31 67 42')]],
    InvalidBufferValueError,
  );
});

test('max', () => {
  expect(generator).toDecode(
    ['00 00 dc c2 08 b2 3e 43'],
    new Date(8640000000000000),
  );
});

test('max save integer', () => {
  expect(generator).toYieldsThrow(
    [[8, hexDataView('ff ff ff ff ff ff 3f 43')]],
    InvalidBufferValueError,
  );
});

test('max value', () => {
  expect(generator).toYieldsThrow(
    [[8, hexDataView('ff ff ff ff ff ff ef 7f')]],
    InvalidBufferValueError,
  );
});
