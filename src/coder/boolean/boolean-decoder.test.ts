import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {Decoding} from '../../type/decoding.js';

import {booleanDecoder} from './boolean-decoder.js';

let decoding: Decoding<boolean>;

beforeEach(() => {
  decoding = booleanDecoder();
});

test('false', () => {
  expect(decoding).toDecode(false, ['00']);
});

test('true', () => {
  expect(decoding).toDecode(true, ['01']);
});

test('42', () => {
  expect(decoding).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('2a')],
  ]);
});
