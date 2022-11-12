import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {booleanDecoder} from './boolean-decoder.js';

let generator: DecoderGenerator<boolean>;

beforeEach(() => {
  generator = booleanDecoder();
});

test('false', () => {
  expect(generator).toDecode(['00'], false);
});

test('true', () => {
  expect(generator).toDecode(['01'], true);
});

test('42', () => {
  expect(generator).toYieldsThrow(
    [[1, hexDataView('2a')]],
    InvalidBufferValueError,
  );
});
