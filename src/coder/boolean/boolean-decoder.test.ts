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
  expect(generator).toDecode(false, ['00']);
});

test('true', () => {
  expect(generator).toDecode(true, ['01']);
});

test('42', () => {
  expect(generator).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('2a')],
  ]);
});
