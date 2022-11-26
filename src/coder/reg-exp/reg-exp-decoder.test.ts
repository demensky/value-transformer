import {beforeEach, expect, test} from 'vitest';

import {hexDataView} from '../../../test-util/hex-data-view.js';
import {InvalidBufferValueError} from '../../error/invalid-buffer-value-error.js';
import type {DecoderGenerator} from '../../type/decoder-generator.js';

import {regExpDecoder} from './reg-exp-decoder.js';

let generator: DecoderGenerator<RegExp>;

beforeEach(() => {
  generator = regExpDecoder();
});

test('empty', () => {
  expect(generator).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('00')],
    [0, hexDataView('')],
    [0, hexDataView('00')],
    [0, hexDataView('')],
  ]);
});

test('empty group', () => {
  expect(generator).toDecode(/(?:)/, [
    '04',
    '28 3f 3a 29',
    '00',
    '',
    '00 00 00 00 00 00 00 00',
  ]);
});

test('no flags', () => {
  expect(generator).toDecode(/a/, [
    '01',
    '61',
    '00',
    '',
    '00 00 00 00 00 00 00 00',
  ]);
});

test('all flags', () => {
  expect(generator).toDecode(/a/dgimsuy, [
    '01',
    '61',
    '07',
    '64 67 69 6d 73 75 79',
    '00 00 00 00 00 00 00 00',
  ]);
});

test('invalid regexp', () => {
  expect(generator).toYieldsThrow(InvalidBufferValueError, [
    [1, hexDataView('02')],
    [2, hexDataView('61 5b')],
    [1, hexDataView('00')],
    [0, hexDataView('')],
  ]);
});
