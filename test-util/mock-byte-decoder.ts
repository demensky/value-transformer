/* istanbul ignore file */

import {jest} from '@jest/globals';
import type {Mock} from 'jest-mock';

import {uint8Decoder} from '../src/coder/uint8/uint8-decoder.js';

export function mockByteDecoder(): Mock<typeof uint8Decoder> {
  return jest.fn<typeof uint8Decoder>(uint8Decoder);
}
